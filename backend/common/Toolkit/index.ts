import type { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { injectable } from 'inversify';
import type { ToolkitService } from 'services/core/domain/ports/output/toolkit.service';

@injectable()
export class Toolkit implements ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null {
    return !entity;
  }
}
