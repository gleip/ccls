import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';

// ports
import { ToolkitService } from '../ports/output/toolkit.service';
import { CoreRepository } from '../ports/output/core.repository';
import { ChangeDust } from '../ports/input/role';

@injectable()
export class RoleService {
  private errors = {
    ROLE_NOT_FOUND: 'Роль не найдена',
  };
  constructor(
    @inject(TYPES.CoreRepository) private repository: CoreRepository,
    @inject(TYPES.Toolkit) private toolkit: ToolkitService,
  ) {}
  public async getRoleList() {
    const roles = await this.repository.getRoleList();
    return roles.map(role => role.getView());
  }
  public async changeDust({ dust, id }: ChangeDust) {
    const role = await this.repository.getRoleById(id);
    if (this.toolkit.entityIsNotExist(role)) {
      throw new Error(this.errors.ROLE_NOT_FOUND);
    }
    role.setDustToZero();
    role.increaseDust(dust.amount);
    await this.repository.putRole(role);
    return role.getView();
  }
}
