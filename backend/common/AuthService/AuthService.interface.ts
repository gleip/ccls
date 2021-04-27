import { IGenerateAuthResult } from "root/domain";
import { Employee } from "services/company/domain/aggregates";

export interface IAuthService {
  getAuth(user: Employee): IGenerateAuthResult;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateVerificationCode(): string;
}