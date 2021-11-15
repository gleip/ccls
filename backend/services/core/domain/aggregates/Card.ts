import { RarityType, ICard } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';

export class Card implements BaseEntity<ICard> {
  private id: string;
  private image: string;
  private name: string;
  private description: string;
  private space?: string;
  private rarity: RarityType;
  private _power: number;
  private _assignedBy?: string;
  private _assignedDate?: Date;
  private created: Date;

  constructor({ power, created, id, image, rarity, assignedDate, name, description, space, assignedBy }: ICard) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.space = space;
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
      name: this.name,
      description: this.description,
      space: this.space,
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
