import { CardRarity, ILegendaryCard } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';

export class LegendaryCard implements BaseEntity<ILegendaryCard> {
  private id: string;
  private image: string;
  private _amount: number;
  private created: Date;

  constructor({ amount, created, id, image }: ILegendaryCard) {
    this.id = id;
    this.image = image;
    this._amount = amount;
    this.created = created;
  }
  public serialize() {
    return {
      id: this.id,
      image: this.image,
      amount: this._amount,
      rarity: CardRarity.Legendary as CardRarity.Legendary,
      created: this.created,
    };
  }
  get amount() {
    return this._amount;
  }
}
