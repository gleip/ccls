import { IRole, RoleType } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { FlourStorage } from 'common/FlourStorage';

export class Role extends FlourStorage implements BaseEntity<IRole> {
  private id: string;
  private role: RoleType;
  private name: string;
  private manager: boolean;
  private administrator: boolean;
  constructor({ id, role, name, manager, administrator, flour }: IRole) {
    super(flour);
    this.id = id;
    this.role = role;
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
      role: this.role,
      name: this.name,
      manager: this.manager,
      administrator: this.administrator,
      flour: this.flour.getView(),
    };
  }
}
