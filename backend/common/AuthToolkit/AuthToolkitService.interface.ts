import { IGenerateAuthResult } from 'root/domain';
import { User } from '../../services/core/domain/aggregates/User';

export interface IHashedInfo {
  hash: string;
  salt: string;
}

export interface AuthToolkitService {
  getAuthInfo(user: User): IGenerateAuthResult;
  getHash(password: string): Promise<IHashedInfo>;
  compare(password: string, hash: IHashedInfo): Promise<boolean>;
  generateVerificationCode(): string;
}
