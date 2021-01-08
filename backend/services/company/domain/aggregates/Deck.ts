import { IDeck } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { AssignedCard } from './AssignedCard';

export class Deck implements BaseEntity<IDeck> {
  private cards: AssignedCard[];
  constructor({ cards }: Pick<IDeck, 'cards'>) {
    this.cards = cards.map(card => new AssignedCard(card));
  }
  public serialize() {
    return {
      amount: this.amount,
      cards: this.cards.map(card => card.serialize()),
    };
  }
  get amount() {
    return this.cards.reduce((acc, card) => {
      return card.amount;
    }, 0);
  }
}
