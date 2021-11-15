import { Space } from '../aggregates/Space';

export interface SpaceRepository {
  getById(spaceId: string): Promise<Space>;
}
