import { IWallet } from 'root/domain';
import { BaseEntity } from '../../../../common/BaseEntity';

export type CreateWalletParam = Pick<IWallet, 'amount'> & Partial<Pick<IWallet, 'updated'>>;

export class Wallet implements BaseEntity<IWallet> {
  private _amount: number;
  private updated: Date;
  constructor({ amount, updated }: CreateWalletParam) {
    this._amount = this.validate(amount);
    this.updated = updated || new Date();
  }
  private validate(value: number) {
    if (value < 0) {
      throw new Error('Сумма в кошельке не может быть меньше 0');
    }
    return value;
  }
  public getView() {
    return {
      amount: this._amount,
      updated: this.updated,
    };
  }
  public decrease(value: number) {
    if (value > this._amount) {
      throw new Error('Сумма списания больше текущей');
    }
    this._amount = this._amount - value;
    this.updated = new Date();
  }
  public increase(value: number) {
    this._amount = this._amount + value;
    this.updated = new Date();
  }
  get ammount() {
    return this._amount;
  }
  set ammount(amount: number) {
    this._amount = this.validate(amount);
    this.updated = new Date();
  }
}
