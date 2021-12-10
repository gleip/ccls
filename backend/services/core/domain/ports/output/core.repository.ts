import { RoleType } from 'root/domain';
import { Card, Role, Space, User } from '../../aggregates';
import { Pagination } from '../input/user';

export interface CoreRepository {
  putUser(user: User): Promise<void>;
  setUserRefreshKey(userId: string, key: string): Promise<void>;
  setUserVerificationCode(userId: string, verificationCode: string): Promise<void>;
  getUserById(userId: string, active?: boolean): Promise<User | null>;
  getUserByEmail(email: string, active?: boolean): Promise<User | null>;
  getUserByRefreshKey(key: string, active?: boolean): Promise<User | null>;
  getUserByVerificationCode(id: string, code: string, active?: boolean): Promise<User | null>;
  getUserList(pagination: Pagination, spaceId?: string, active?: boolean): Promise<{ total: number; users: User[] }>;
  getSpaceById(spaceId: string): Promise<Space | null>;
  putSpace(space: Space): Promise<void>;
  getRoleByType(type: RoleType): Promise<Role>;
  getRoleById(id: string): Promise<Role>;
  getLegendaryCardById(id: string): Promise<Card | null>;
  removeLegendaryCardById(id: string): Promise<void>;
  addLegendaryCard(card: Card): Promise<void>;
  savePutCardResult(userFrom: User, userTo: User, spaceFrom?: Space, legendaryCardId?: string): Promise<void>;
}
