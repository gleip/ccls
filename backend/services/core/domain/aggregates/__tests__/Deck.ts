import { RarityType } from 'root/domain';
import { Card } from '../Card';
import { Deck } from '../Deck';

describe('Методы по работе с "Колодой"', () => {
  const emptyDeckCreateParam = {
    cards: [],
    count: 0,
    power: 0,
  };
  const getCard = (power: number) =>
    new Card({
      created: new Date(),
      image: 'uuid',
      power,
      rarity: RarityType.Common,
      assignedBy: 'uuid',
      assignedDate: new Date(),
    });
  test('Колода успешно создается', () => {
    const deck = new Deck(emptyDeckCreateParam);
    expect(deck.getView()).toMatchObject(emptyDeckCreateParam);
  });
  test('В колоду можно добавить карту', () => {
    const deck = new Deck(emptyDeckCreateParam);
    deck.add(getCard(100));
    expect(deck.count).toBe(1);
    expect(deck.power).toBe(100);
  });
  test('Не пустую колоду карт можно преобразовать в представление для пользователей', () => {
    const deck = new Deck(emptyDeckCreateParam);
    const card = getCard(100);
    deck.add(card);
    expect(deck.getView()).toMatchObject({
      cards: [card.getView()],
      power: 100,
      count: 1,
    });
  });
});
