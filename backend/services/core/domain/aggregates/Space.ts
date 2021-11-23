import { ISpace } from 'root/domain';
import { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { DustStorage } from './DustStorage';
import { CreateWalletParam } from './Wallet';

type CreateSpaceParam = Omit<ISpace, 'dust'> & { dust: CreateWalletParam };

export class Space extends DustStorage implements BaseEntity<ISpace> {
  private id: string;
  private name: string;
  private active: boolean;
  constructor({ active, dust, id, name }: CreateSpaceParam) {
    super(dust);
    this.id = id;
    this.name = name;
    this.active = active;
  }
  public deactivate() {
    this.active = false;
  }
  public isActive() {
    return this.active;
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
