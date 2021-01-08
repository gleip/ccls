/**
 * Обработка ошибок
 */
export function errorHandling(defaultMessage: string) {
  return function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function() {
      try {
        return await original.apply(this, arguments);
      } catch (error) {
        let errorText = defaultMessage;
        if (error instanceof Error) {
          errorText = error.message;
        }
        if (this.logger?.error) {
          this.logger.error(errorText, error?.stack);
        }
        throw new Error(errorText);
      }
    };
  };
}
