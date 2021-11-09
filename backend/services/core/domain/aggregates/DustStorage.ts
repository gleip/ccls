import { Wallet, CreateWalletParam } from './Wallet';

export class DustStorage {
  protected dust: Wallet;
  constructor(params: CreateWalletParam) {
    this.dust = new Wallet(params);
  }
  public increaseDust(amount: number) {
    this.dust.increase(amount);
  }
  public decreaseDust(amount: number) {
    this.dust.decrease(amount);
  }
  public getDust() {
    return this.dust.ammount;
  }
  public setDustToZero() {
    this.dust.decrease(this.dust.ammount);
  }
}
