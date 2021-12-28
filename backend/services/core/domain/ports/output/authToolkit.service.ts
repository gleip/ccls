import { IGenerateAuthResult } from '../../interfaces';
import { User } from '../../aggregates/User';

export interface IHashedInfo {
  hash: string;
  salt: string;
}

export type UserCredentials = Pick<User, 'id' | 'role' | 'spaceId' | 'email'>;
export interface RefreshTokenCredentials {
  refreshKey: string;
}

export type Credentials = UserCredentials | RefreshTokenCredentials;

export interface AuthToolkitService {
  getAuthInfo(user: User): IGenerateAuthResult;
  verifyJwtToken(token: string): Promise<Credentials>;
  getHash(password: string): Promise<IHashedInfo>;
  compare(password: string, hash: IHashedInfo): Promise<boolean>;
  generateVerificationCode(): string;
}
