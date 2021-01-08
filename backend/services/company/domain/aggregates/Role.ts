import { IRole, UserRole } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { Wallet } from './Wallet';

export class Role implements BaseEntity<IRole> {
  private dust: Wallet;
  private role: UserRole;
  constructor({ dust, role }: IRole) {
    this.dust = new Wallet(dust);
    this.role = role;
  }
  public setDust(value: number) {
    this.dust.ammount = value;
  }
  public serialize() {
    return {
      dust: this.dust.serialize(),
      role: this.role,
    };
  }
}
