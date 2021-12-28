import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import { randomUUID } from 'crypto';

// ports
import { ToolkitService } from '../ports/output/toolkit.service';
import { CoreRepository } from '../ports/output/core.repository';
import { Change, ChangeSpaceActivity, Create, GetSpace, GetSpacesList } from '../ports/input/space';
import { Space } from '../aggregates';
import type { UserService } from './User.service';

@injectable()
export class SpaceService {
  private errors = {
    SPACE_NOT_FOUD: 'Пространство не найдено',
    SPACE_NOT_EMPTY: 'Нельзя деактивировать не пустое пространство',
  };
  constructor(
    @inject(TYPES.Toolkit) private toolkit: ToolkitService,
    @inject(TYPES.CoreRepository) private repository: CoreRepository,
    @inject(TYPES.UserService) private userService: UserService,
  ) {}
  public async create({ dust, name }: Create) {
    const space = new Space({ active: true, dust, id: randomUUID(), name });
    await this.repository.putSpace(space);
    return space.getView();
  }
  public async change({ id, dust, name }: Change) {
    const space = await this.repository.getSpaceById(id);
    if (this.toolkit.entityIsNotExist(space)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    if (dust) {
      space.setDustToZero();
      space.increaseDust(dust.amount);
    }
    if (name) {
      space.name = name;
    }
    await this.repository.putSpace(space);
    return space.getView();
  }
  public async changeSpaceActivity({ id, active }: ChangeSpaceActivity) {
    const space = await this.repository.getSpaceById(id);
    if (this.toolkit.entityIsNotExist(space)) {
      throw new Error(this.errors.SPACE_NOT_FOUD);
    }
    if (active === false) {
      const users = await this.userService.getList({ spaceId: id, limit: 1 });
      if (users.total !== 0) {
        throw new Error(this.errors.SPACE_NOT_EMPTY);
      }
      space.deactivate();
    } else {
      space.activate();
    }
    await this.repository.putSpace(space);
    return space.getView();
  }
  public async getSpace({ id }: GetSpace) {
    const space = await this.repository.getSpaceById(id);
    if (space) {
      return space.getView();
    }
    return space;
  }
  public async getSpaceList(pagination: GetSpacesList) {
    const { spaces, total } = await this.repository.getSpaceList(pagination);
    return {
      spaces: spaces.map(space => space.getView()),
      total,
    };
  }
}
