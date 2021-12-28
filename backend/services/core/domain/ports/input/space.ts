import { ISpace } from '../../interfaces';
import { Pagination } from './user';

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
 * Запрос на получение списка существующих "пространств"
 */
export type GetSpacesList = Pagination;

/**
 * Запрос на получение "пространства"
 */
export type GetSpace = Pick<ISpace, 'id'>;
