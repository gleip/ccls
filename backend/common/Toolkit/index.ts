import { BaseEntity } from 'services/core/domain/aggregates/BaseEntity';
import { injectable } from 'inversify';
import { ToolkitService as TolkitServiceDomain } from '../../services/core/domain/ports/toolkit.service';

export type ToolkitService = TolkitServiceDomain & { envValidate(name: string, value: string | undefined): string };

@injectable()
export class Toolkit implements ToolkitService {
  entityIsNotExist<E extends BaseEntity>(entity: E | null): entity is null {
    return !entity;
  }
  envValidate(name: string, value: string | undefined) {
    if (!value) {
      throw new Error(`Не установлена обязательная настройка: ${name}`);
    }
    return value;
  }
}
