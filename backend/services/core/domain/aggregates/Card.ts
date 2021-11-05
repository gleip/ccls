import { RarityType, ICard } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';

export class Card implements BaseEntity<ICard> {
  private id: string | undefined;
  private image: string;
  private rarity: RarityType;
  private _power: number;
  private _assignedBy?: string;
  private _assignedDate?: Date;
  private created: Date;

  constructor({ power, created, id, image, rarity, assignedDate, assignedBy }: ICard) {
    this.id = id;
    this.image = image;
    this.rarity = rarity;
    this._power = power;
    this._assignedBy = assignedBy;
    this._assignedDate = assignedDate;
    this.created = created;
  }
  public getView() {
    return {
      id: this.id,
      image: this.image,
      rarity: this.rarity,
      power: this.power,
      assignedBy: this._assignedBy,
      assignedDate: this._assignedDate,
      created: this.created,
    };
  }
  isCommon() {
    return this.rarity === RarityType.Common;
  }
  isRare() {
    return this.rarity === RarityType.Rare;
  }
  isLegendary() {
    return this.rarity === RarityType.Legendary;
  }
  get power() {
    return this._power;
  }
  set assignedBy(assignedBy: string) {
    this._assignedBy = assignedBy;
  }
  set assignedDate(assignedDate: Date) {
    this._assignedDate = assignedDate;
  }
}
