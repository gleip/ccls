import { RarityType } from '../../../interfaces';
import { Card } from '../../Card';
import { getCard, getLegendaryCard } from '../fixtures';

describe('Методы работы с "Карточкой"', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date());
  });
  test('Карточка успешно создается', () => {
    const card = new Card(getCard());
    expect(card.getView()).toMatchObject(getCard());
  });
  test('Обычная карточка успешно создается', () => {
    const card = new Card(getCard());
    expect(card.isCommon()).toBeTruthy();
  });
  test('Редкая карточка успешно создается', () => {
    const card = new Card({ ...getCard(), rarity: RarityType.Rare });
    expect(card.isRare()).toBeTruthy();
  });
  test('Легендарная карточка успешно создается', () => {
    const card = new Card(getLegendaryCard());
    expect(card.isLegendary()).toBeTruthy();
  });
  test('При присвоении легендарной карты можно задать идентификатор пользователя, который дарит карту и время присвоения', () => {
    const card = new Card(getLegendaryCard());
    const assignedDate = new Date();
    const assignedBy = 'uuid';
    card.assignedBy = assignedBy;
    card.assignedDate = assignedDate;
    expect(card.getView()).toMatchObject({ assignedBy, assignedDate });
  });
});
