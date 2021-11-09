import { IEmployee, IAuth } from 'root/domain';

// commands
import { ICreateEmployee } from '../../ports/command/user/create';
import { IUpdateEmployee } from '../../ports/command/user/update';
import { IMoveEmployeeToAnotherSpace } from '../../ports/command/moveEmployeeToAnotherSpace.command';
import { IGiveCard } from '../../ports/command/giveCard.command';
import { IGiveLegendaryCard } from '../../ports/command/giveLegendaryCard.command';
import { ISignIn } from '../../ports/command/signIn.command';
import { IRefreshToken } from '../../ports/command/refreshToken.command';
import { ISetPassword } from '../../ports/command/setPassword.command';
import { ISetVrificationCode } from '../../ports/command/setVerificationCode.command';
import { IDeactivateEmployee } from '../../ports/command/deactivate.command';

// queries
import { IGetEmployeeList } from '../../ports/query/getEmployeeList';
import { IGetEmployee } from '../../ports/query/getEmployee';

export interface IEmployeeService {
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
   * Выключить пользователя
   */
  deactivate(params: IDeactivateEmployee): Promise<void>;

  /**
   * Создать нового сотрудника
   */
  create(params: ICreateEmployee): Promise<IEmployee>;

  /**
   * Обновить сотрудника
   */
  update(params: IUpdateEmployee): Promise<IEmployee>;

  /**
   * Получить список сотрудников
   */
  getList(params: IGetEmployeeList): Promise<NodeJS.ReadableStream>;

  /**
   * Получить сотрудника по id
   */
  get(params: IGetEmployee): Promise<IEmployee>;

  /*
   * Переместить сотрудника в другое пространство
   */
  moveEmployeeToAnotherSpace(params: IMoveEmployeeToAnotherSpace): Promise<void>;

  /**
   * Подарить другому сотруднику обычную карточку
   */
  giveCard(params: IGiveCard): Promise<void>;

  /**
   * Подарить другому сотруднику легендарную карточку
   */
  giveLegendaryCard(params: IGiveLegendaryCard): Promise<void>;
}
