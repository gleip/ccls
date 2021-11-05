import { envValidate } from './index';

describe('Проверка функции валидации переменных окружения', () => {
  test('Если переменная окружения задана то функция возвращает значение переменной', () => {
    const ENV_VARIABLE = 'testValue';
    const result = envValidate('ENV_VARIABLE', ENV_VARIABLE);
    expect(result).toBe(ENV_VARIABLE);
  });
  test('Если переменная окружения не задана то выбрасывается ошибка', () => {
    try {
      const ENV_EMPTY_VARIABLE = undefined;
      const result = envValidate('ENV_EMPTY_VARIABLE', ENV_EMPTY_VARIABLE);
    } catch (error) {
      expect(error).toEqual(new Error('Не установлена обязательная настройка: ENV_EMPTY_VARIABLE'))
    }
  })
});
