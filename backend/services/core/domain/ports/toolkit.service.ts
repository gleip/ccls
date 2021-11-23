import { BaseEntity } from '../aggregates/BaseEntity';

export interface ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null;
}
