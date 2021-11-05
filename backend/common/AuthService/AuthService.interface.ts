import { IGenerateAuthResult } from "root/domain";
import { IEmployee } from "../../../domain";

export interface IHashedInfo {
  hash: string;
  salt: string;
}

export interface IAuthService {
  getAuth(user: IEmployee): IGenerateAuthResult;
  getHash(password: string): Promise<IHashedInfo>;
  compare(password: string, hash: IHashedInfo): Promise<boolean>;
  generateVerificationCode(): string;
}