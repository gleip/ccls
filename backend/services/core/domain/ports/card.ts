import { ICard } from 'root/domain';

/**
 *  Команда на добавление "легендарной карты" в ростер
 */
export type CreateLegendaryCard = Pick<ICard, 'image' | 'power'>;

/**
 * Команда на удаление "легендарной карты" из ростера
 */
export type DeleteLegendaryCard = Pick<ICard, 'id'>;

/**
 * Запрос на получение списка достпупных для покупки "легендарных карт"
 */
export type GetLegendaryCardsList = {};
