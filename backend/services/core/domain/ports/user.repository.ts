import { User } from '../aggregates';
import { Pagination } from './user';

export interface UserRepository {
  put(user: User): Promise<void>;
  setUserRefreshKey(userId: string, key: string): Promise<void>;
  getById(userId: string, active?: boolean): Promise<User | null>;
  getByEmail(email: string, active?: boolean): Promise<User | null>;
  getByRefreshKey(key: string, active?: boolean): Promise<User | null>;
  getByVerificationCode(id: string, code: string, active?: boolean): Promise<User | null>;
  getList(pagination: Pagination, spaceId?: string, active?: boolean): Promise<User[]>;
}
