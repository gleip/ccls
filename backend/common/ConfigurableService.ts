type AvailableTypes = 'number' | 'string';
type Result<T extends AvailableTypes> = T extends 'number' ? number : string;

export class ConfigurableService {
  protected castToNumber(value: string) {
    const result = +value;
    if (isNaN(result)) {
      throw new Error(`Невозможно привести значение ${value} к строке`);
    }
    return result;
  }
  protected getSettingFromEnv(name: string) {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Не установлена обязательная настройка: ${name}`);
    }
    return value;
  }
}
