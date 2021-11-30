import { AuthToolkitService } from '../ports/output/authToolkit.service';
import { ToolkitService } from '../ports/output/toolkit.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../inversify.types';
import { User, Role, Space } from '../aggregates';
import { RoleType } from 'root/domain';

// Ports
import {
  Register,
  SendVerificationCode,
  SignIn,
  RefreshToken,
  ChangeEmail,
  ChangePassword,
  ChangeRole,
  ChangeSpace,
  ChangeUserActivity,
  GetUserList,
  GetUser,
  PutCard,
  PutLegendaryCard,
  Update,
} from '../ports/input/user';
import { CardGenerator } from '../ports/output/cardGenerator.service';
import { CoreRepository } from '../ports/output/core.repository';
import { NotifierService } from '../ports/output/notifier.service';

interface WriteOffPlan {
  writeOffFromUser: number;
  writeOffFromSpace: number;
}

@injectable()
export class UserService {
  private errors = {
    USER_NOT_FOUND: 'Пользователь не найден',
    SPACE_NOT_FOUD: 'Пространство не найдено',
    WRONG_EMAIL_OR_PASSWORD: 'Неверный логин или пароль',
    USER_EXIST: 'Пользователь с таким email уже существует',
    LEGENDARY_CARD_NOT_FOUND: 'Легендарная карточка не найдена',
    WRITE_OFF_DUST_ERROR: 'Не достаточно пыли чтобы совершить опрацию',
  };
  constructor(
    @inject(TYPES.CardGenerator) private cardGenerator: CardGenerator,
    @inject(TYPES.AuthService) private authService: AuthToolkitService,
    @inject(TYPES.Toolkit) private toolkit: ToolkitService,
    @inject(TYPES.CoreRepository) private repository: CoreRepository,
    @inject(TYPES.Notifier) private notifier: NotifierService,
  ) {}

  private async getAuthInfo(user: User) {
    const { auth, refresh } = this.authService.getAuthInfo(user);
    await this.repository.setUserRefreshKey(user.id, refresh);
    return auth;
  }

  public async register({ password, ...userInfo }: Register) {
    const existUser = await this.repository.getUserByEmail(userInfo.email);
    if (existUser) {
      throw new Error(this.errors.USER_EXIST);
    }
    const role = await this.repository.getRoleByType(RoleType.Employee);
    const user = User.create({ ...userInfo, role: role.getView() });
    const hashedPassword = await this.authService.getHash(password);
    user.password = hashedPassword;
    await this.repository.putUser(user);
    return this.getAuthInfo(user);
  }

  public async signIn({ email, password }: SignIn) {
    const user = await this.repository.getUserByEmail(email, true);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.WRONG_EMAIL_OR_PASSWORD);
    }
    const isMatch = await this.authService.compare(password, user.password);
    if (!isMatch) {
      throw new Error(this.errors.WRONG_EMAIL_OR_PASSWORD);
    }
    return this.getAuthInfo(user);
  }

  public async refreshToken({ refreshKey }: RefreshToken) {
    const user = await this.repository.getUserByRefreshKey(refreshKey);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    return this.getAuthInfo(user);
  }

  public async sendVerificationCode({ id }: SendVerificationCode) {
    const user = await this.repository.getUserById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    const verificationCode = this.authService.generateVerificationCode();
    await this.notifier.sendVerificationCode({ email: user.email, code: verificationCode });
    return this.repository.setUserVerificationCode(id, verificationCode);
  }

  public async changePassword({ password, verificationCode, id }: ChangePassword) {
    const user = await this.repository.getUserByVerificationCode(id, verificationCode);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    const hashPassword = await this.authService.getHash(password);
    user.password = hashPassword;
    await this.repository.putUser(user);
  }

  public async changeEmail({ id, email, verificationCode }: ChangeEmail) {
    const user = await this.repository.getUserByVerificationCode(id, verificationCode);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    user.email = email;
    await this.repository.putUser(user);
  }

  public async update({ id, avatar, name, patronymic, phone, surname }: Update) {
    const user = await this.repository.getUserById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (avatar) {
      user.avatar = avatar;
    }
    if (name) {
      user.name = name;
    }
    if (patronymic) {
      user.patronymic = patronymic;
    }
    if (phone) {
      user.phone = phone;
    }
    if (surname) {
      user.surname = surname;
    }
    await this.repository.putUser(user);
    return user.getView();
  }

  public async changeRole({ id, role }: ChangeRole) {
    const user = await this.repository.getUserById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    user.role = new Role(role);
    await this.repository.putUser(user);
  }

  public async changeSpace({ id, spaceId }: ChangeSpace) {
    const [user, space] = await Promise.all([this.repository.getUserById(id), this.repository.getSpaceById(spaceId)]);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (this.toolkit.entityIsNotExist(space)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    user.spaceId = spaceId;
    await this.repository.putUser(user);
  }

  public async changeActivity({ id, active }: ChangeUserActivity) {
    const user = await this.repository.getUserById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (active) {
      user.activate();
    } else {
      user.deactivate();
    }
    await this.repository.putUser(user);
  }

  public async get({ id }: GetUser) {
    const user = await this.repository.getUserById(id, true);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    return user.getView();
  }

  public async getList({ spaceId, ...pagination }: GetUserList) {
    const { total, users } = await this.repository.getUserList(pagination, spaceId);
    return { total, users: users.map(user => user.getView()) };
  }

  private getWriteOffPlan(user: User, space: Space, dust: number): WriteOffPlan {
    const inStockUserDust = user.dust;
    if (inStockUserDust >= dust) {
      return { writeOffFromUser: dust, writeOffFromSpace: 0 };
    }
    if (!user.isManager()) {
      throw new Error(this.errors.WRITE_OFF_DUST_ERROR);
    }
    const inStockSpaceDust = space.getDust();
    const diffDust = dust - inStockUserDust;
    if (diffDust > inStockSpaceDust) {
      throw new Error(this.errors.WRITE_OFF_DUST_ERROR);
    }
    return { writeOffFromUser: user.dust, writeOffFromSpace: diffDust };
  }

  private async getPutCardProcessEntities(userFromId: string, spaceFromId: string, userToId: string) {
    const userFromRequest = this.repository.getUserById(userFromId, true);
    const userToRequest = this.repository.getUserById(userToId, true);
    const spaceFromRequest = this.repository.getSpaceById(spaceFromId);
    const [userFrom, userTo, spaceFrom] = await Promise.all([userFromRequest, userToRequest, spaceFromRequest]);
    if (this.toolkit.entityIsNotExist(userFrom) || this.toolkit.entityIsNotExist(userTo)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (this.toolkit.entityIsNotExist(spaceFrom)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    return { userFrom, userTo, spaceFrom };
  }

  public async putCard({ userFromId, userToId, spaceFromId, name, description, power, image }: PutCard) {
    const { userFrom, spaceFrom, userTo } = await this.getPutCardProcessEntities(userFromId, spaceFromId, userToId);
    const { writeOffFromUser, writeOffFromSpace } = this.getWriteOffPlan(userFrom, spaceFrom, power);
    const card = await this.cardGenerator.makeCard({ userFrom, userTo, spaceFrom, name, description, power, image });
    userTo.putCard(card);
    userFrom.writeOffDust(writeOffFromUser);
    spaceFrom.decreaseDust(writeOffFromSpace);
    return this.repository.savePutCardResult(userFrom, userTo, spaceFrom);
  }

  public async putLegendaryCard({ id, userFromId, spaceFromId, userToId }: PutLegendaryCard) {
    const { userFrom, spaceFrom, userTo } = await this.getPutCardProcessEntities(userFromId, spaceFromId, userToId);
    const legendaryCard = await this.repository.getLegendaryCardById(id);
    if (this.toolkit.entityIsNotExist(legendaryCard)) {
      throw new Error(this.errors.LEGENDARY_CARD_NOT_FOUND);
    }
    const { writeOffFromUser, writeOffFromSpace } = this.getWriteOffPlan(userFrom, spaceFrom, legendaryCard.power);
    userTo.putCard(legendaryCard);
    userFrom.writeOffDust(writeOffFromUser);
    spaceFrom.decreaseDust(writeOffFromSpace);
    return this.repository.savePutCardResult(userFrom, userTo, spaceFrom, id);
  }
}
