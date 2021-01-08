import { CardRarity, IAssignedCard, IAssignedEmployee } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';

export class AssignedCard implements BaseEntity<IAssignedCard> {
  private id: string;
  private image: string;
  private rarity: CardRarity;
  private _amount: number;
  private created?: Date;
  private assigned: Date;
  private assignedBy: IAssignedEmployee[];

  constructor({ amount, created, id, image, rarity, assigned, assignedBy }: IAssignedCard) {
    this.id = id;
    this.image = image;
    this.rarity = rarity;
    this._amount = amount;
    this.created = created;
    this.assigned = assigned;
    this.assignedBy = assignedBy;
  }
  public serialize() {
    return {
      id: this.id,
      image: this.image,
      rarity: this.rarity,
      amount: this._amount,
      created: this.created,
      assigned: this.assigned,
      assignedBy: this.assignedBy,
    };
  }
  get amount() {
    return this._amount;
  }
}
