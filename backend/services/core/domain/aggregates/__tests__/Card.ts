import { RarityType } from 'root/domain';
import { Card } from '../Card';

describe('Методы работы с "Карточкой"', () => {
  const commonCardCreateParam = {
    image: 'uuid',
    power: 100,
    rarity: RarityType.Common,
    created: new Date(),
    assignedBy: 'uuid',
    assignedDate: new Date(),
  };
  const legendaryCardCreateParam = {
    created: new Date(),
    image: 'uuid',
    power: 10000,
    rarity: RarityType.Legendary,
    id: 'uuid',
  };
  test('Карточка успешно создается', () => {
    const card = new Card(commonCardCreateParam);
    expect(card.getView()).toMatchObject(commonCardCreateParam);
  });
  test('Обычная карточка успешно создается', () => {
    const card = new Card(commonCardCreateParam);
    expect(card.isCommon()).toBeTruthy();
  });
  test('Редкая карточка успешно создается', () => {
    const card = new Card({ ...commonCardCreateParam, rarity: RarityType.Rare });
    expect(card.isRare()).toBeTruthy();
  });
  test('Легендарная карточка успешно создается', () => {
    const card = new Card(legendaryCardCreateParam);
    expect(card.isLegendary()).toBeTruthy();
  });
  test('При присвоении легендарной карты можно задать идентификатор пользователя, который дарит карту и время присвоения', () => {
    const card = new Card(legendaryCardCreateParam);
    const assignedDate = new Date();
    const assignedBy = 'uuid';
    card.assignedBy = assignedBy;
    card.assignedDate = assignedDate;
    expect(card.getView()).toMatchObject({ assignedBy, assignedDate });
  });
});
