import { User } from '../aggregates';

export interface UserRepository {
  put(user: User): Promise<void>;
  setUserRefreshKey(userId: string, key: string): Promise<void>;
  getById(userId: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByRefreshKey(key: string): Promise<User>;
  getByVerificationCode(id: string, code: string): Promise<User>;
  getList(spaceId?: string): Promise<User[]>;
}
