import { ISpace } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { DustStorage } from './DustStorage';

export class Space extends DustStorage implements BaseEntity<ISpace> {
  private id: string;
  private name: string;
  private active: boolean;
  constructor({ active, dust, id, name }: ISpace) {
    super(dust);
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
      dust: this.dust.getView(),
      active: this.active,
    };
  }
}
