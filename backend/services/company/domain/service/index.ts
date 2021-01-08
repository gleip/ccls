import { IAdministrator, IAuth } from 'root/domain';

// commands
import { ISignInAdministrator } from '../ports/command/administrator/signIn';
import { IRefreshAdministratorToken } from '../ports/command/administrator/refreshToken';
import { ICreateAdministrator } from '../ports/command/administrator/create';
import { IUpdateAdministrator } from '../ports/command/administrator/update';
import { IDeleteAdministrator } from '../ports/command/administrator/delete';
import { ISetAdministratorPassword } from '../ports/command/administrator/setPassword';
import { ISetvVrificationCode } from '../ports/command/administrator/setVerificationCode';

// query
import { IGetAdministrator } from '../ports/query/getAdministrator';

export interface IAdministratorService {
  /**
   * Войти в систему под учетной записью администратора
   */
  signIn(params: ISignInAdministrator): Promise<IAuth>;

  /**
   * Обновить авторизационный токен
   */
  refreshToken(params: IRefreshAdministratorToken): Promise<IAuth>;

  /**
   * Создать нового администратора
   */
  create(params: ICreateAdministrator): Promise<IAdministrator>;

  /**
   * Обновить администратора
   */
  update(params: IUpdateAdministrator): Promise<IAdministrator>;

  /**
   * Удалить администратора
   */
  delete(params: IDeleteAdministrator): Promise<void>;

  /**
   * Задать новый пароль
   */
  setPassword(params: ISetAdministratorPassword): Promise<void>;

  /**
   * Задать новый проверочный код для смены пароля
   */
  setVerificationCode(params: ISetvVrificationCode): Promise<void>;

  /**
   * Получить список администраторов
   */
  getList(params: IGetAdministrator): Promise<IAdministrator[]>;
}

export { Company } from '../CompanyService';
