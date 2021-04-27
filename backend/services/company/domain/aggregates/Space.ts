import { ISpace } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { FlourStorage } from 'root/backend/common/FlourStorage';

export class Space extends FlourStorage implements BaseEntity<ISpace> {
  private id: string;
  private name: string;
  private active: boolean;
  constructor({ active, flour, id, name }: ISpace) {
    super(flour);
    this.id = id;
    this.name = name;
    this.active = active;
  }
  public deactivate() {
    this.active = false;
  }
  public getView() {
    return {
      id: this.id,
      name: this.name,
      flour: this.flour.getView(),
      active: this.active,
    };
  }
}
