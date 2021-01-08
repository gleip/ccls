import { IWallet } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';

export class Wallet implements BaseEntity<IWallet> {
  private _amount: number;
  private updated: Date;
  constructor({ amount, updated }: IWallet) {
    this._amount = amount;
    this.updated = updated;
  }
  serialize() {
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
    this._amount = amount;
    this.updated = new Date();
  }
}
