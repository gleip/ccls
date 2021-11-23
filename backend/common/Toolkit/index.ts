import { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { injectable } from 'inversify';
import { ToolkitService } from '../../services/core/domain/ports/toolkit.service';

@injectable()
export class Toolkit implements ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null {
    return !entity;
  }
}
