import { ISpace } from '../interfaces';
import { BaseEntity } from './BaseEntity';
import { DustStorage } from './DustStorage';
import { CreateWalletParam } from './Wallet';

type CreateSpaceParam = Omit<ISpace, 'dust'> & { dust: CreateWalletParam };

export class Space extends DustStorage implements BaseEntity<ISpace> {
  private id: string;
  private _name: string;
  private active: boolean;
  constructor({ active, dust, id, name }: CreateSpaceParam) {
    super(dust);
    this.id = id;
    this._name = name;
    this.active = active;
  }
  public deactivate() {
    this.active = false;
  }
  public activate() {
    this.active = true;
  }
  public isActive() {
    return this.active;
  }
  public getView() {
    return {
      id: this.id,
      name: this._name,
      dust: this.dust.getView(),
      active: this.active,
    };
  }
  set name(name: string) {
    this._name = name;
  }
}
