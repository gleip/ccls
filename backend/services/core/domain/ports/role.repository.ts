import { RoleType } from 'root/domain';
import { Role } from '../aggregates';

export interface RoleRepository {
  getRoleByType(type: RoleType): Promise<Role>;
}
