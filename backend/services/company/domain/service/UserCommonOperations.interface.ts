import { IAuth } from 'root/domain';
import { IDeleteUser } from '../ports/command/delete.command';
import { IRefreshToken } from '../ports/command/refreshToken.command';
import { ISetPassword } from '../ports/command/setPassword.command';
import { ISetVrificationCode } from '../ports/command/setVerificationCode.command';
import { ISignIn } from '../ports/command/signIn.command';

export interface IUserCommonOperations {
  /**
   * Войти в систему
   */
  signIn(params: ISignIn): Promise<IAuth>;

  /**
   * Обновить авторизационный токен
   */
  refreshToken(params: IRefreshToken): Promise<IAuth>;

  /**
   * Задать новый пароль
   */
  setPassword(params: ISetPassword): Promise<void>;

  /**
   * Задать новый проверочный код для смены пароля
   */
  setVerificationCode(params: ISetVrificationCode): Promise<void>;

  /**
   * Удалить пользователя
   */
  delete(params: IDeleteUser): Promise<void>;
}
