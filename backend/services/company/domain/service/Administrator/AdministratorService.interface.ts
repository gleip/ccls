import { IAdministrator } from 'root/domain';
import { IUserCommonOperations } from '../UserCommonOperations.interface';

// commands
import { ICreateAdministrator } from '../../ports/command/administrator/create';
import { IUpdateAdministrator } from '../../ports/command/administrator/update';

// queries
import { IGetAdministratorList } from '../../ports/query/getAdministratorList';

export interface IAdministratorService extends IUserCommonOperations {
  /**
   * Создать нового администратора
   */
  create(params: ICreateAdministrator): Promise<IAdministrator>;

  /**
   * Обновить администратора
   */
  update(params: IUpdateAdministrator): Promise<IAdministrator>;

  /**
   * Получить список администраторов
   */
  getList(params: IGetAdministratorList): Promise<IAdministrator[]>;
}
