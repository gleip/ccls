import { Wallet } from '../Wallet';

describe('Методы работы с кошельком', () => {
  test('Успешно создается новый кошелек', () => {
    const date = new Date();
    const wallet = new Wallet({ amount: 10000, updated: date });
    expect(wallet.getView()).toMatchObject({
      amount: 10000,
      updated: date,
    });
  });
  test('Если при создании кошелька не передать дату обновления, дата подставится создаться автоматически', () => {
    const wallet = new Wallet({ amount: 10000 });
    expect(wallet.getView().updated).toBeInstanceOf(Date);
  });
  test('Количество хранящихся едениц валюты в кошельке можно уменьшить', () => {
    const wallet = new Wallet({ amount: 10000 });
    wallet.decrease(1000)
    expect(wallet.ammount).toBe(9000);
  });
});
