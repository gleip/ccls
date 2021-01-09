import { IEmployee } from 'root/domain';
import { IUserCommonOperations } from '../UserCommonOperations.interface';

// commands
import { ICreateEmployee } from '../../ports/command/employee/create';
import { IUpdateEmployee } from '../../ports/command/employee/update';
import { IAddEmployeeToDepatrment } from '../../ports/command/addEmployeeToDepartmen.command';
import { IRemoveEmployeeFromDepatrment } from '../../ports/command/removeEmployeeFromDepartment.command';
import { IGiveCard } from '../../ports/command/giveCard.command';
import { IGiveLegendaryCard } from '../../ports/command/giveLegendaryCard.command';

// queries
import { IGetEmployeeList } from '../../ports/query/getEmployeeList';

export interface IEmployeeService extends IUserCommonOperations {
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
   * Добавить сотрудника в департамент
   */
  addEmployeeToDepartment(params: IAddEmployeeToDepatrment): Promise<void>;

  /**
   * Удалить сотрудника из департамента
   */
  removeEmployeeFromDepartment(params: IRemoveEmployeeFromDepatrment): Promise<void>;

  /**
   * Подарить другому сотруднику обычную карточку
   */
  giveCard(params: IGiveCard): Promise<void>;

  /**
   * Подарить другому сотруднику легендарную карточку
   */
  giveLegendaryCard(params: IGiveLegendaryCard): Promise<void>;
}
