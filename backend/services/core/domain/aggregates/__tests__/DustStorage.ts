import { DustStorage } from '../DustStorage';

describe('Проверка методов работы с хранилищем пыли', () => {
  test('Успешно создается хранилище пыли', () => {
    const dustStorage = new DustStorage({ amount: 1000 });
    expect(dustStorage.getDust()).toBe(1000);
  });
  test('Количество пыли в хранилище можно уменьшить', () => {
    const dustStorage = new DustStorage({ amount: 1000 });
    dustStorage.decreaseDust(100);
    expect(dustStorage.getDust()).toBe(900);
  });
  test('Количество пыли в хранилище можно увеличить', () => {
    const dustStorage = new DustStorage({ amount: 1000 });
    dustStorage.increaseDust(100);
    expect(dustStorage.getDust()).toBe(1100);
  });
  test('Количество пыли в хранилище можно обнулить', () => {
    const dustStorage = new DustStorage({ amount: 1000 });
    dustStorage.setDustToZero();
    expect(dustStorage.getDust()).toBe(0);
  });
});
