export class ConfigurableService {
  private castToNumber(value: string) {
    const result = +value;
    if (isNaN(result)) {
      throw new Error(`Невозможно привести значение ${value} к строке`);
    }
    return result;
  }
  protected getSettingFromEnv<T extends 'number'>(name: string, type?: 'number'): T extends 'number' ? number : string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Не установлена обязательная настройка: ${name}`);
    }

    if (type) {
      return this.castToNumber(value);
    }
    return value;
  }
}
