import { IGenerateAuthResult } from "root/domain";
import { Employee } from "services/company/domain/aggregates";

export interface IHashedPassword {
  hash: string;
  salt: string;
}

export interface IAuthService {
  getAuth(user: Employee): IGenerateAuthResult;
  hashPassword(password: string): Promise<IHashedPassword>;
  comparePassword(password: string, hash: IHashedPassword): Promise<boolean>;
  generateVerificationCode(): string;
}