import { IWallet } from 'root/domain';
import { Wallet } from './Wallet';

export class FlourStorage {
  protected flour: Wallet;
  constructor(params: IWallet) {
    this.flour = new Wallet(params);
  }
  public increaseFloure(amount: number) {
    this.flour.increase(amount);
  }
  public decreaseFloure(amount: number) {
    this.flour.decrease(amount);
  }
  public getFlour() {
    return this.flour.ammount;
  }
  public setFlourToZero() {
    this.flour.decrease(this.flour.ammount);
  }
}
