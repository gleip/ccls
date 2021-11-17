import { AuthToolkitService } from 'common/AuthToolkit';
import { ToolkitService } from 'common/Toolkit';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../inversify.types';
import { User, Role, Space } from '../aggregates';
import { RoleType } from 'root/domain';

// Ports
import {
  Register,
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
} from '../ports/user';
import { UserRepository } from '../ports/user.repository';
import { RoleRepository } from '../ports/role.repository';
import { SpaceRepository } from '../ports/space.repository';
import { CardGenerator } from '../ports/cardGenerator.service';
import { LegendaryCardRepository } from '../ports/legendaryCard.repository';

interface WriteOffResult {
  user: number;
  space?: number;
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
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.RoleRepository) private roleRepository: RoleRepository,
    @inject(TYPES.SpaceRepository) private spaceRepository: SpaceRepository,
    @inject(TYPES.CardGenerator) private cardGenerator: CardGenerator,
    @inject(TYPES.LegendaryCardRepository) private legendaryCardRepository: LegendaryCardRepository,
    @inject(TYPES.AuthService) private authService: AuthToolkitService,
    @inject(TYPES.Toolkit) private toolkit: ToolkitService,
  ) {}

  private async getAuthInfo(user: User) {
    const { auth, refresh } = this.authService.getAuthInfo(user);
    await this.userRepository.setUserRefreshKey(user.id, refresh);
    return auth;
  }

  public async register({ password, ...userInfo }: Register) {
    const existUser = await this.userRepository.getByEmail(userInfo.email);
    if (existUser) {
      throw new Error(this.errors.USER_EXIST);
    }
    const role = await this.roleRepository.getRoleByType(RoleType.Employee);
    const user = User.create({ ...userInfo, role: role.getView() });
    const hashedPassword = await this.authService.getHash(password);
    user.password = hashedPassword;
    await this.userRepository.put(user);
    return this.getAuthInfo(user);
  }

  public async signIn({ email, password }: SignIn) {
    const user = await this.userRepository.getByEmail(email, true);
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
    const user = await this.userRepository.getByRefreshKey(refreshKey);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    return this.getAuthInfo(user);
  }

  public async changePassword({ password, verificationCode, id }: ChangePassword) {
    const user = await this.userRepository.getByVerificationCode(id, verificationCode);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    const hashPassword = await this.authService.getHash(password);
    user.password = hashPassword;
    await this.userRepository.put(user);
  }

  public async changeEmail({ id, email, verificationCode }: ChangeEmail) {
    const user = await this.userRepository.getByVerificationCode(id, verificationCode);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    user.email = email;
    await this.userRepository.put(user);
  }

  public async changeRole({ id, role }: ChangeRole) {
    const user = await this.userRepository.getById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    user.role = new Role(role);
    await this.userRepository.put(user);
  }

  public async changeSpace({ id, spaceId }: ChangeSpace) {
    const user = await this.userRepository.getById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    user.spaceId = spaceId;
    await this.userRepository.put(user);
  }

  public async changeActivity({ id, active }: ChangeUserActivity) {
    const user = await this.userRepository.getById(id);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (active) {
      user.activate();
    } else {
      user.deactivate();
    }
    await this.userRepository.put(user);
  }

  public async update({ id, avatar, name, patronymic, phone, surname }: Update) {
    const user = await this.userRepository.getById(id);
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
    await this.userRepository.put(user);
    return user.getView();
  }

  public async get({ id }: GetUser) {
    const user = await this.userRepository.getById(id, true);
    if (this.toolkit.entityIsNotExist(user)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    return user.getView();
  }

  public async getList({ spaceId, ...pagination }: GetUserList) {
    return this.userRepository.getList(pagination, spaceId);
  }

  private async writeOffDust(user: User, space: Space, dust: number): Promise<WriteOffResult> {
    const inStockUserDust = user.dust;
    if (inStockUserDust >= dust) {
      user.writeOffDust(dust);
      await this.userRepository.put(user);
      return { user: dust };
    }
    if (!user.isManager()) {
      throw new Error(this.errors.WRITE_OFF_DUST_ERROR);
    }
    const inStockSpaceDust = space.getDust();
    const diffDust = dust - inStockUserDust;
    if (diffDust > inStockSpaceDust) {
      throw new Error(this.errors.WRITE_OFF_DUST_ERROR);
    }
    user.writeOffDust(user.dust);
    space.decreaseDust(diffDust);
    await this.userRepository.put(user);
    await this.spaceRepository.put(space).catch(async error => {
      user.dust = inStockUserDust;
      await this.userRepository.put(user);
      throw error;
    });
    return { user: user.dust, space: diffDust };
  }

  private async rollBackWriteOff(userFrom: User, spaceFrom: Space, writeOffResult: WriteOffResult) {
    userFrom.addDust(writeOffResult.user);
    if (writeOffResult.space) {
      spaceFrom.increaseDust(writeOffResult.space);
      await this.spaceRepository.put(spaceFrom);
    }
    await this.userRepository.put(userFrom);
  }

  public async putCard({ userIdFrom, userIdTo, spaceIdFrom, name, description, power }: PutCard) {
    const userFromRequest = await this.userRepository.getById(userIdFrom);
    const userToRequest = await this.userRepository.getById(userIdTo);
    const spaceFromRequest = await this.spaceRepository.getById(spaceIdFrom);
    const [userFrom, userTo, spaceFrom] = await Promise.all([userFromRequest, userToRequest, spaceFromRequest]);
    if (this.toolkit.entityIsNotExist(userFrom) || this.toolkit.entityIsNotExist(userTo)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (this.toolkit.entityIsNotExist(spaceFrom)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    const card = await this.cardGenerator.getCard({ userFrom, userTo, spaceFrom, name, description, power });
    const writeOffResult = await this.writeOffDust(userFrom, spaceFrom, power);
    userTo.putCard(card);
    return this.userRepository.put(userTo).catch(async error => {
      await this.rollBackWriteOff(userFrom, spaceFrom, writeOffResult);
      throw error;
    });
  }

  public async putLegendaryCard({ id, userIdTo, userIdFrom, spaceIdFrom }: PutLegendaryCard) {
    const userFromRequest = await this.userRepository.getById(userIdFrom);
    const userToRequest = await this.userRepository.getById(userIdTo);
    const spaceFromRequest = await this.spaceRepository.getById(spaceIdFrom);
    const legendaryCardRequest = await this.legendaryCardRepository.getById(id);
    const [userFrom, userTo, spaceFrom, card] = await Promise.all([
      userFromRequest,
      userToRequest,
      spaceFromRequest,
      legendaryCardRequest,
    ]);
    if (this.toolkit.entityIsNotExist(userFrom) || this.toolkit.entityIsNotExist(userTo)) {
      throw new Error(this.errors.USER_NOT_FOUND);
    }
    if (this.toolkit.entityIsNotExist(spaceFrom)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    if (this.toolkit.entityIsNotExist(card)) {
      throw new Error(this.errors.LEGENDARY_CARD_NOT_FOUND);
    }
    const writeOffResult = await this.writeOffDust(userFrom, spaceFrom, card.power);
    userTo.putCard(card);
    return this.userRepository.put(userTo).catch(async error => {
      await this.rollBackWriteOff(userFrom, spaceFrom, writeOffResult);
      throw error;
    });
  }
}
