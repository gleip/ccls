import { IRole, RoleType } from 'root/domain';
import { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { DustStorage } from './DustStorage';
import { CreateWalletParam } from './Wallet';

export type CreateRoleParam = Omit<IRole, 'dust'> & { dust: CreateWalletParam };

export class Role extends DustStorage implements BaseEntity<IRole> {
  private id: string;
  private type: RoleType;
  private name: string;
  constructor({ id, type, name, dust }: CreateRoleParam) {
    super(dust);
    this.id = id;
    this.type = type;
    this.name = name;
  }
  public isManager() {
    return this.type === RoleType.Manager;
  }
  public isAdministrator() {
    return this.type === RoleType.Administrator;
  }
  public getView() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      dust: this.dust.getView(),
    };
  }
}
