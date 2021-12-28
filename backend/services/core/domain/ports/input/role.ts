import { IRole } from '../../interfaces';

/**
 * Команда на изменение количества "пыли" у "роли"
 */
export type ChangeDust = Pick<IRole, 'id' | 'dust'>;

/**
 * Запрос на получение списка "ролей"
 */
export type GetRolesList = {};
