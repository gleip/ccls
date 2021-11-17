import { Space } from '../aggregates/Space';

export interface SpaceRepository {
  getById(spaceId: string): Promise<Space | null>;
  put(space: Space): Promise<void>;
}
