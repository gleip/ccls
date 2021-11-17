import { BaseEntity } from 'common/BaseEntity';
import { injectable } from 'inversify';
import { ToolkitService } from './ToolkitService.interface';

@injectable()
export class Toolkit implements ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null {
    return !entity;
  }
}
