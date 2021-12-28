import { DataSource, DataSourceConfig } from 'apollo-datasource';
import type { KeyValueCache } from 'apollo-server-caching';
import type { UserService } from '../domain/services/User.service';

// Domain input ports
import {
  Register,
  SignIn,
  RefreshToken,
  SendVerificationCode,
  ChangePassword,
  ChangeEmail,
  Update,
  ChangeRole,
  ChangeSpace,
  ChangeUserActivity,
  GetUser,
  GetUserList,
  PutCard,
  PutLegendaryCard,
} from '../domain/ports/input/user';

type Entities = 'user' | 'space' | 'role' | 'legendaryCard';

export class DomainLogicDatasource extends DataSource {
  private cache?: KeyValueCache<string>;
  private cacheUserTtl = 60 * 60; // 1 hour
  constructor(private userService: UserService) {
    super();
  }
  public initialize({ cache }: DataSourceConfig<unknown>) {
    this.cache = cache;
  }
  private getCacheKey<T extends object>(entities: Entities, params: T) {
    const key = Object.keys(params).join('-');
    return `${entities}-${key}`;
  }
  public async register(params: Register) {
    return this.userService.register(params);
  }
  public async signIn(params: SignIn) {
    return this.userService.signIn(params);
  }
  public async refreshUserToken(params: RefreshToken) {
    return this.userService.refreshToken(params);
  }
  public async sendUserVerificationCode(params: SendVerificationCode) {
    return this.userService.sendVerificationCode(params);
  }
  public async changeUserPassword(params: ChangePassword) {
    return this.userService.changePassword(params);
  }
  public async changeUserEmail(params: ChangeEmail) {
    const result = await this.userService.changeEmail(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.id }));
    return result;
  }
  public async updateUser(params: Update) {
    const result = await this.userService.update(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.id }));
    return result;
  }
  public async changeUserRole(params: ChangeRole) {
    const result = await this.userService.changeRole(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.id }));
    return result;
  }
  public async changeUserSpace(params: ChangeSpace) {
    const result = this.userService.changeSpace(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.id }));
    return result;
  }
  public async changeUserActivity(params: ChangeUserActivity) {
    const result = await this.userService.changeActivity(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.id }));
    return result;
  }
  public async getUser(params: GetUser) {
    const userFromCache = await this.cache?.get(this.getCacheKey('user', params));
    if (userFromCache) {
      return JSON.parse(userFromCache);
    }
    const user = await this.userService.get(params);
    this.cache?.set(this.getCacheKey('user', params), JSON.stringify(user), { ttl: this.cacheUserTtl });
    return user;
  }
  public async getUserList(params: GetUserList) {
    return this.userService.getList(params);
  }
  public async putCard(params: PutCard) {
    const result = await this.userService.putCard(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.userFromId }));
    this.cache?.delete(this.getCacheKey('user', { id: params.userToId }));
    return result;
  }
  public async putLegendaryCard(params: PutLegendaryCard) {
    const result = await this.userService.putLegendaryCard(params);
    this.cache?.delete(this.getCacheKey('user', { id: params.userFromId }));
    this.cache?.delete(this.getCacheKey('user', { id: params.userToId }));
    return result;
  }
}
