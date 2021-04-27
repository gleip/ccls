import { IDeck } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { Card } from './Card';

export class Deck implements BaseEntity<IDeck> {
  private cards: Card[];
  constructor({ cards }: Pick<IDeck, 'cards'>) {
    this.cards = cards.map(card => new Card(card));
  }
  public add(card: Card) {
    this.cards.push(card);
  }
  public getView() {
    return {
      power: this.power,
      count: this.count,
      cards: this.cards.map(card => card.getView()),
    };
  }
  get power() {
    return this.cards.reduce((power, card) => power + card.power, 0);
  }
  get count() {
    return this.cards.length;
  }
}
