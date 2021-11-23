import { IDeck } from 'root/domain';
import { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { Card } from './Card';

export class Deck implements BaseEntity<IDeck> {
  private cards: Card[];
  private _power: number;
  private _count: number;
  constructor({ cards, count, power }: IDeck) {
    this.cards = cards.map(card => new Card(card));
    this._count = count;
    this._power = power;
  }
  public add(card: Card) {
    this.cards.push(card);
    this._power += card.power;
    this._count++;
  }
  public getView() {
    return {
      power: this.power,
      count: this.count,
      cards: this.cards.map(card => card.getView()),
    };
  }
  get power() {
    return this._power;
  }
  get count() {
    return this._count;
  }
}
