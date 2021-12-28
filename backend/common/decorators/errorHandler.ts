import { LoggerService } from '../Logger/LoggerService.interface';

export function errorHandler(message: string) {
  return function methodDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor & { logger?: LoggerService },
  ) {
    const original = descriptor.value;
    descriptor.value = async function () {
      try {
        return await original.apply(this, arguments);
      } catch (error) {
        if (this.logger) {
          this.logger.error(message, error);
        }
        throw new Error(message);
      }
    };
  };
}
