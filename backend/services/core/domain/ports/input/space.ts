import { ISpace } from 'root/domain';

/**
 * Команда на создание "пространства"
 */
export type Create = Pick<ISpace, 'name' | 'dust'>;

/**
 * Команда на изменение "пространства"
 */
export type Change = Pick<ISpace, 'id'> & Partial<Pick<ISpace, 'name' | 'dust'>>;

/**
 * Команда на деактивацию или активировацию "пространства"
 */
export type ChangeSpaceActivity = Pick<ISpace, 'id' | 'active'>;

/**
 * Команда на изменение количества "пыли" у "пространства"
 */
export type ChangeDust = Pick<ISpace, 'id' | 'dust'>;

/**
 * Запрос на получение списка существующих "пространств"
 */
export type GetSpacesList = Partial<Pick<ISpace, 'name'>>;

/**
 * Запрос на получение "пространства"
 */
export type GetSpace = Pick<ISpace, 'id'>;
