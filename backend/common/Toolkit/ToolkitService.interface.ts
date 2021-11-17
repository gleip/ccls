import { BaseEntity } from '../BaseEntity';

export interface ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null;
}
