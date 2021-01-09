import { injectable, inject } from 'inversify';
import { TYPES } from '../../../inversify.types';
import { IAdministratorRepository } from '../../ports/repository';
import { IAdministratorService } from './AdministratorService.interface';

// commands
import { ICreateAdministrator } from '../../ports/command/administrator/create';
import { IDeleteUser } from '../../ports/command/delete.command';
import { IUpdateAdministrator } from '../../ports/command/administrator/update';
import { ISetPassword } from '../../ports/command/setPassword.command';
import { ISignIn } from '../../ports/command/signIn.command';
import { IRefreshToken } from '../../ports/command/refreshToken.command';
import { ISetVrificationCode } from '../../ports/command/setVerificationCode.command';

// queries
import { IGetAdministratorList } from '../../ports/query/getAdministratorList';

// entities
import { Administrator } from '../../aggregates/Administrator';

import { IAuthService } from 'root/backend/common/AuthService/AuthService.interface';
import { INotifier } from 'common/Notifier/Notifier.interface';

@injectable()
export class AdministratorService implements IAdministratorService {
  constructor(
    @inject(TYPES.AdministratorRepository) private administratorRepository: IAdministratorRepository,
    @inject(TYPES.AuthService) private authService: IAuthService,
    @inject(TYPES.Notifier) private notifier: INotifier,
  ) {}
  public async create(params: ICreateAdministrator) {
    const administrator = Administrator.create(params);
    await this.administratorRepository.save(administrator);
    await this.setVerificationCode({ email: administrator.email });
    return administrator.serialize();
  }

  public async delete({ id }: IDeleteUser) {
    return this.administratorRepository.delete(id);
  }

  public async update({ id, ...updatedInfo }: IUpdateAdministrator) {
    const administrator = await this.administratorRepository.getById(id);
    if (!administrator) {
      throw new Error('Администратор не найден');
    }
    administrator.update(updatedInfo);
    await this.administratorRepository.update(administrator);
    return administrator.serialize();
  }

  public async setPassword({ email, password, verificationCode }: ISetPassword) {
    const administrator = await this.administratorRepository.getByVerificationCode(email, verificationCode);
    if (!administrator) {
      throw new Error('Неверный проверочный код');
    }
    const hash = await this.authService.hashPassword(password);
    await this.administratorRepository.saveHashPassword(administrator.id, hash);
  }

  public async setVerificationCode({ email }: ISetVrificationCode) {
    const code = this.authService.generateVerificationCode();
    await this.administratorRepository.saveVerificationCode(email, code);
    await this.notifier.sendEmail({
      email,
      subject: 'Проверочный код для установки пароля администратора',
      text: code,
    });
  }

  public async signIn({ email, password }: ISignIn) {
    const error = new Error('Неверный логин или пароль');
    const administrator = await this.administratorRepository.getByEmail(email);
    if (!administrator) {
      throw error;
    }
    const hashPassword = await this.administratorRepository.getHashPassword(administrator.id);
    if (!hashPassword) {
      throw error;
    }
    const passwordIsEqual = await this.authService.comparePassword(password, hashPassword);
    if (!passwordIsEqual) {
      throw error;
    }
    const { auth, refresh } = this.authService.getAuth(administrator.serialize());
    await this.administratorRepository.saveRefreshToken(administrator.id, refresh);
    return auth;
  }

  public async refreshToken({ refreshToken }: IRefreshToken) {
    const administrator = await this.administratorRepository.getByRefreshToken(refreshToken);
    if (!administrator) {
      throw new Error('Администратор не найден');
    }
    const { auth, refresh } = this.authService.getAuth(administrator.serialize());
    await this.administratorRepository.saveRefreshToken(administrator.id, refresh);
    return auth;
  }

  public async getList(params: IGetAdministratorList) {
    const result = await this.administratorRepository.getList();
    return result.map(administrator => administrator.serialize());
  }
}
