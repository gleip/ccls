import { Wallet } from '../Wallet';
import { setTimeout } from 'timers/promises';

describe('Методы работы с кошельком', () => {
  const lessThanZeroError = new Error('Сумма в кошельке не может быть меньше 0');
  test('Успешно создается новый кошелек', () => {
    const date = new Date();
    const wallet = new Wallet({ amount: 10000, updated: date });
    expect(wallet.getView()).toMatchObject({
      amount: 10000,
      updated: date,
    });
  });
  test('Кошелек нельзя создать с отрицательной суммой', () => {
    try {
      const wallet = new Wallet({ amount: -100 });
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toEqual(lessThanZeroError);
    }
  });
  test('Если при создании кошелька не передать дату обновления, дата подставится создаться автоматически', () => {
    const wallet = new Wallet({ amount: 10000 });
    expect(wallet.getView().updated).toBeInstanceOf(Date);
  });
  test('Количество хранящихся едениц валюты в кошельке можно уменьшить', () => {
    const wallet = new Wallet({ amount: 10000 });
    wallet.decrease(1000);
    expect(wallet.ammount).toBe(9000);
  });
  test('Если сумма списания больше чем в кошельке сгенерируется ошибка', () => {
    const wallet = new Wallet({ amount: 1000 });
    try {
      wallet.decrease(2000);
    } catch (error) {
      expect(error).toEqual(new Error('Сумма списания больше текущей'));
    }
  });
  test('После успешного списания обновляется дата обновления кошелька', async () => {
    const date = new Date();
    const wallet = new Wallet({ amount: 3000, updated: date });
    await setTimeout(100);
    wallet.decrease(2000);
    expect(wallet.getView().updated).not.toEqual(date);
    expect(wallet.getView().updated).toBeInstanceOf(Date);
  });
  test('Количество хранящихся едениц валюты в кошельке можно увеличить', () => {
    const wallet = new Wallet({ amount: 1000 });
    wallet.increase(1000);
    expect(wallet.ammount).toBe(2000);
  });
  test('После успешного начисления обновляется дата обновления кошелька', async () => {
    const date = new Date();
    const wallet = new Wallet({ amount: 1000, updated: date });
    await setTimeout(100);
    wallet.increase(1000);
    expect(wallet.getView().updated).not.toEqual(date);
    expect(wallet.getView().updated).toBeInstanceOf(Date);
  });
  test('Количество валюты в кошельке можно поменять на произвольное значение', async () => {
    const wallet = new Wallet({ amount: 1000 });
    wallet.ammount = 100;
    expect(wallet.ammount).toBe(100);
  });
  test('Количество валюты нкльзя установить меньше 0', async () => {
    const wallet = new Wallet({ amount: 1000 });
    try {
      wallet.ammount = -100;
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error).toEqual(lessThanZeroError);
    }
  });
  test('После успешного изменения суммы в кошельке меняется дата обновления кошелька', async () => {
    const date = new Date();
    const wallet = new Wallet({ amount: 1000, updated: date });
    await setTimeout(100);
    wallet.ammount = 100;
    expect(wallet.getView().updated).not.toEqual(date);
    expect(wallet.getView().updated).toBeInstanceOf(Date);
  });
});
