import { IAuthService } from 'common/AuthService/AuthService.interface';
import { INotifier } from 'common/Notifier/Notifier.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from 'services/core/inversify.types';
import { User, Role, Card } from '../../aggregates';
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
} from '../../ports/user';
import { UserRepository } from '../../ports/user.repository';
import { RoleRepository } from '../../ports/role.repository';
import { SpaceRepository } from '../../ports/space.repository';
import { CardGenerator } from '../../ports/cardGenerator.service';
import { LegendaryCardRepository } from '../../ports/legendaryCard.repository';

@injectable()
export class UserService {
  private errors = {
    NOT_FOUND: 'Пользователь не найден',
    WRONG_EMAIL_OR_PASSWORD: 'Неверный логин или пароль',
    EMPLOYEE_EXIST: 'Пользователь с таким email уже существует',
    CARD_NOT_FOUND: 'Карточка не найдена',
  };
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.RoleRepository) private roleRepository: RoleRepository,
    @inject(TYPES.SpaceRepository) private spaceRepository: SpaceRepository,
    @inject(TYPES.CardGenerator) private cardGenerator: CardGenerator,
    @inject(TYPES.LegendaryCardRepository) private legendaryCardRepository: LegendaryCardRepository,
    @inject(TYPES.AuthService) private authService: IAuthService,
    @inject(TYPES.Notifier) private notifier: INotifier,
  ) {}

  // private async getEmployeeById(id: string) {
  //   const employee = await this.employeeRepository.getById(id);
  //   if (!employee) {
  //     throw new Error(this.errors.NOT_FOUND);
  //   }
  //   return employee;
  // }

  private async getAuthInfo(user: User) {
    const { auth, refresh } = this.authService.getAuthInfo(user);
    await this.userRepository.setUserRefreshKey(user.id, refresh);
    return auth;
  }

  public async register({ password, ...userInfo }: Register) {
    const role = await this.roleRepository.getRoleByType(RoleType.Employee);
    const user = User.create({ ...userInfo, role: role.getView() });
    const hashedPassword = await this.authService.getHash(password);
    user.password = hashedPassword;
    await this.userRepository.put(user);
    return this.getAuthInfo(user);
  }

  public async signIn({ email, password }: SignIn) {
    const user = await this.userRepository.getByEmail(email);
    const isMatch = await this.authService.compare(password, user.password);
    if (!isMatch) {
      throw new Error(this.errors.WRONG_EMAIL_OR_PASSWORD);
    }
    return this.getAuthInfo(user);
  }

  public async refreshToken({ refreshKey }: RefreshToken) {
    const user = await this.userRepository.getByRefreshKey(refreshKey);
    return this.getAuthInfo(user);
  }

  public async changePassword({ password, verificationCode, id }: ChangePassword) {
    const user = await this.userRepository.getByVerificationCode(id, verificationCode);
    const hashPassword = await this.authService.getHash(password);
    user.password = hashPassword;
    await this.userRepository.put(user);
  }

  public async changeEmail({ id, email, verificationCode }: ChangeEmail) {
    const user = await this.userRepository.getByVerificationCode(id, verificationCode);
    user.email = email;
    await this.userRepository.put(user);
  }

  public async changeRole({ id, role }: ChangeRole) {
    const user = await this.userRepository.getById(id);
    user.role = new Role(role);
    await this.userRepository.put(user);
  }

  public async changeSpace({ id, spaceId }: ChangeSpace) {
    const user = await this.userRepository.getById(id);
    user.spaceId = spaceId;
    await this.userRepository.put(user);
  }

  public async changeActivity({ id, active }: ChangeUserActivity) {
    const user = await this.userRepository.getById(id);
    if (active) {
      user.activate();
    } else {
      user.deactivate();
    }
    await this.userRepository.put(user);
  }

  public async update({ id, avatar, name, patronymic, phone, surname }: Update) {
    const user = await this.userRepository.getById(id);
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
    return this.userRepository.getById(id);
  }

  public async getList({ spaceId }: GetUserList) {
    return this.userRepository.getList(spaceId);
  }

  public async putCard({ userIdFrom, userIdTo, spaceIdFrom, name, description, power }: PutCard) {
    const userFromRequest = await this.userRepository.getById(userIdFrom);
    const userToRequest = await this.userRepository.getById(userIdTo);
    const spaceFromRequest = await this.spaceRepository.getById(spaceIdFrom);
    const [userFrom, userTo, spaceFrom] = await Promise.all([userFromRequest, userToRequest, spaceFromRequest]);
    userFrom.writeOffDust(power);
    const card = await this.cardGenerator.getCard({ userFrom, userTo, spaceFrom, name, description, power });
    userTo.putCard(card);
    await this.userRepository.put(userFrom);
    return this.userRepository.put(userTo).catch(async error => {
      userFrom.addDust(power);
      await this.userRepository.put(userFrom);
      throw error;
    });
  }

  public async putLegendaryCard({ id, userIdTo, userIdFrom, spaceIdFrom }: PutLegendaryCard) {
    const userFromRequest = await this.userRepository.getById(userIdFrom);
    const userToRequest = await this.userRepository.getById(userIdTo);
    const spaceFromRequest = await this.spaceRepository.getById(spaceIdFrom);
    const legendaryCardRequest = await this.legendaryCardRepository.getById(id);
    const [userFrom, userTo, spaceFrom, legendaryCard] = await Promise.all([
      userFromRequest,
      userToRequest,
      spaceFromRequest,
      legendaryCardRequest,
    ]);
    userFrom.writeOffDust(legendaryCard.power);
    spaceFrom.
  }
}
