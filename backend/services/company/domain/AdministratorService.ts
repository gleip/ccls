import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify.types';
import { IAdministratorRepository } from './ports/repository';
import { IAdministratorService } from './service';

// commands
import { ICreateAdministrator } from './ports/command/administrator/create';
import { IDeleteAdministrator } from './ports/command/administrator/delete';
import { IUpdateAdministrator } from './ports/command/administrator/update';
import { ISetAdministratorPassword } from './ports/command/administrator/setPassword';
import { ISignInAdministrator } from './ports/command/administrator/signIn';
import { IRefreshAdministratorToken } from './ports/command/administrator/refreshToken';
import { ISetvVrificationCode } from './ports/command/administrator/setVerificationCode';

// queries
import { IGetAdministrator } from './ports/query/getAdministrator';

// entities
import { Administrator } from './aggregates/Administrator';

import { IAuthService } from 'root/domain';
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

  public async delete({ id }: IDeleteAdministrator) {
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

  public async setPassword({ email, password, verificationCode }: ISetAdministratorPassword) {
    const administrator = await this.administratorRepository.getByVerificationCode(email, verificationCode);
    if (!administrator) {
      throw new Error('Неверный проверочный код');
    }
    const hash = await this.authService.hashPassword(password);
    await this.administratorRepository.saveHashPassword(administrator.id, hash);
  }

  public async setVerificationCode({ email }: ISetvVrificationCode) {
    const code = this.authService.generateVerificationCode();
    await this.administratorRepository.saveVerificationCode(email, code);
    await this.notifier.sendEmail({
      email,
      subject: 'Проверочный код для установки пароля администратора',
      text: code,
    });
  }

  public async signIn({ email, password }: ISignInAdministrator) {
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

  public async refreshToken({ refreshToken }: IRefreshAdministratorToken) {
    const administrator = await this.administratorRepository.getByRefreshToken(refreshToken);
    if (!administrator) {
      throw new Error('Администратор не найден');
    }
    const { auth, refresh } = this.authService.getAuth(administrator.serialize());
    await this.administratorRepository.saveRefreshToken(administrator.id, refresh);
    return auth;
  }

  public async getList(params: IGetAdministrator) {
    const result = await this.administratorRepository.getList();
    return result.map(administrator => administrator.serialize());
  }
}
