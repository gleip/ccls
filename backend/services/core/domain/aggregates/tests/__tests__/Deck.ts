import { Card } from '../../Card';
import { Deck } from '../../Deck';
import { getCard } from '../fixtures';

describe('Методы по работе с "Колодой"', () => {
  const emptyDeckCreateParam = {
    cards: [],
    count: 0,
    power: 0,
  };
  test('Колода успешно создается', () => {
    const deck = new Deck(emptyDeckCreateParam);
    expect(deck.getView()).toMatchObject(emptyDeckCreateParam);
  });
  test('В колоду можно добавить карту', () => {
    const deck = new Deck(emptyDeckCreateParam);
    deck.add(new Card(getCard(100)));
    expect(deck.count).toBe(1);
    expect(deck.power).toBe(100);
  });
  test('Не пустую колоду карт можно преобразовать в представление для пользователей', () => {
    const deck = new Deck(emptyDeckCreateParam);
    const card = new Card(getCard(100));
    deck.add(card);
    expect(deck.getView()).toMatchObject({
      cards: [card.getView()],
      power: 100,
      count: 1,
    });
  });
});
