import { IRole, RoleType } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { DustStorage } from './DustStorage';

export class Role extends DustStorage implements BaseEntity<IRole> {
  private id: string;
  private type: RoleType;
  private name: string;
  private manager: boolean;
  private administrator: boolean;
  constructor({ id, type, name, manager, administrator, dust }: IRole) {
    super(dust);
    this.id = id;
    this.type = type;
    this.name = name;
    this.manager = manager;
    this.administrator = administrator;
  }
  public isManager() {
    return this.manager;
  }
  public isAdministrator() {
    return this.administrator;
  }
  public getView() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      manager: this.manager,
      administrator: this.administrator,
      dust: this.dust.getView(),
    };
  }
}
