import { IGenerateAuthResult, IUser } from "root/domain";

export interface IAuthService {
  getAuth(user: IUser): IGenerateAuthResult;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateVerificationCode(): string;
}