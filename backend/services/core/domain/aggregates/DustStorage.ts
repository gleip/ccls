import { IWallet } from 'root/domain';
import { Wallet } from './Wallet';

export class DustStorage {
  protected dust: Wallet;
  constructor(params: IWallet) {
    this.dust = new Wallet(params);
  }
  public increaseduste(amount: number) {
    this.dust.increase(amount);
  }
  public decreaseduste(amount: number) {
    this.dust.decrease(amount);
  }
  public getdust() {
    return this.dust.ammount;
  }
  public setdustToZero() {
    this.dust.decrease(this.dust.ammount);
  }
}
