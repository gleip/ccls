import { inject, injectable } from 'inversify';
import { CoreRepository } from '../domain/ports/output/core.repository';
import { MongoClient, Collection } from 'mongodb';
import { ConfigurableService } from '../../../common/ConfigurableService';
import { TYPES } from '../inversify.types';
import { LoggerService } from '../../../common/Logger/LoggerService.interface';
import { Card, Role, Space, User } from '../domain/aggregates';
import { ICard, IRole, ISpace, IUser } from 'root/domain';
import { IPassword } from '../domain/aggregates/User';
import { Pagination } from '../domain/ports/input/user';
import { RoleType } from 'root/domain';
import { errorHandler } from '../../../decorators/errorHandler';

interface UserSystemInfo {
  refreshKey: string;
  verificationCode: string;
}
interface Revision {
  revision: number;
}
type UserDocument = IUser & { password: IPassword } & UserSystemInfo & Revision;
type SpaceDocument = ISpace & Revision;
type RoleDocument = IRole & Revision;
type LegendaryCardDocument = ICard;

@injectable()
export class Repository extends ConfigurableService implements CoreRepository {
  private client: MongoClient;
  private dbName: string;
  private userCollection: Collection<UserDocument>;
  private spaceCollection: Collection<SpaceDocument>;
  private roleCollection: Collection<RoleDocument>;
  private legendaryCardCollection: Collection<LegendaryCardDocument>;
  private revisions: WeakMap<User | Space | Role | Card, number> = new WeakMap();
  constructor(@inject(TYPES.LoggerService) private logger: LoggerService) {
    super();
    const uri = this.getSettingFromEnv('MONGODB_URI');
    this.dbName = this.getSettingFromEnv('MONGODB_DB_NAME');
    this.client = new MongoClient(uri);
    this.userCollection = this.client.db(this.dbName).collection('users');
    this.spaceCollection = this.client.db(this.dbName).collection('spaces');
    this.roleCollection = this.client.db(this.dbName).collection('roles');
    this.legendaryCardCollection = this.client.db(this.dbName).collection('cards');
  }
  private async createIndexes() {
    return Promise.all([
      this.userCollection.createIndex({ id: 1, revision: 1 }, { unique: true }),
      // this.userCollection.createIndex({ id: 1 }, { unique: true }),
    ]);
  }
  public async connect() {
    try {
      await this.client.connect();
      await this.client.db(this.dbName).command({ ping: 1 });
      await this.createIndexes();
      this.logger.info('Успешное подключение к mongodb');
    } catch (error) {
      this.logger.fatal('Не удалось подключиться к mongodb', error);
    }
  }
  @errorHandler('Не удалось сохранить пользователя')
  public async putUser(user: User) {
    const revision = this.revisions.get(user);
    if (revision === undefined) {
      await this.userCollection.insertOne({
        ...user.getView(),
        password: user.password,
        revision: 1,
        refreshKey: '',
        verificationCode: '',
      });
      return;
    }
    await this.userCollection.updateOne(
      { id: user.id, revision },
      { $set: { ...user.getView(), revision: revision + 1 } },
    );
  }
  @errorHandler('Не удалось сохранить ключ для обновления токена')
  public async setUserRefreshKey(id: string, key: string) {
    await this.userCollection.updateOne({ id }, { $set: { refreshKey: key } });
  }
  @errorHandler('Не удалось сохранить проверочный код')
  public async setUserVerificationCode(id: string, verificationCode: string) {
    await this.userCollection.updateOne({ id }, { $set: { verificationCode } });
  }
  @errorHandler('Ошибка при получении пользователя')
  private async getUserByFilters<T extends Partial<UserDocument>>(filters: T) {
    const finalFilters = Object.keys(filters).reduce((result, key) => {
      const value = filters[key as keyof T];
      if (value !== undefined) {
        result[key as keyof T] = value;
      }
      return result;
    }, {} as { [key in keyof T]: T[key] });
    const userDocument = await this.userCollection.findOne(finalFilters);
    if (userDocument) {
      const user = new User(userDocument);
      this.revisions.set(user, userDocument.revision);
      return user;
    }
    return null;
  }
  public async getUserById(id: string, active?: boolean) {
    return this.getUserByFilters({ id, active });
  }
  public async getUserByEmail(email: string, active?: boolean) {
    return this.getUserByFilters({ email, active });
  }
  public async getUserByRefreshKey(refreshKey: string, active?: boolean) {
    return this.getUserByFilters({ refreshKey, active });
  }
  public async getUserByVerificationCode(id: string, verificationCode: string, active?: boolean) {
    return this.getUserByFilters({ id, verificationCode, active });
  }
  @errorHandler('Ошибка при получении списка пользователей')
  public async getUserList({ limit, offset = 0 }: Pagination, spaceId?: string, active?: boolean) {
    const filters: { spaceId?: string; active?: boolean } = {};
    if (spaceId) {
      filters.spaceId = spaceId;
    }
    if (active !== undefined) {
      filters.active = active;
    }
    const totalUserRequest = this.userCollection.countDocuments(filters);
    const userDocumentListRequest = this.userCollection.find(filters).skip(offset).limit(limit).toArray();
    const [total, userDocumentList] = await Promise.all([totalUserRequest, userDocumentListRequest]);
    return {
      users: userDocumentList.map(item => new User(item)),
      total,
    };
  }
  @errorHandler('Ошибка при получении пространства')
  public async getSpaceById(id: string) {
    const spaceDocument = await this.spaceCollection.findOne({ id });
    if (spaceDocument) {
      const space = new Space(spaceDocument);
      this.revisions.set(space, spaceDocument.revision);
      return space;
    }
    return null;
  }
  @errorHandler('Не удалось сохранить пространство')
  public async putSpace(space: Space) {
    const revision = this.revisions.get(space);
    const spaceView = space.getView();
    if (revision === undefined) {
      await this.spaceCollection.insertOne({ ...spaceView, revision: 1 });
      return;
    }
    await this.spaceCollection.updateOne(
      { id: spaceView.id, revision },
      { $set: { ...spaceView, revision: revision + 1 } },
    );
  }
  @errorHandler('Не удалось получить роль')
  public async getRoleByType(type: RoleType) {
    const roleDocument = await this.roleCollection.findOne({ type });
    if (roleDocument) {
      const role = new Role(roleDocument);
      this.revisions.set(role, roleDocument.revision);
      return role;
    }
    throw new Error(`Роли с типом ${type} не найденно`);
  }
  @errorHandler('Не удалось получить легендарную карту')
  public async getLegendaryCardById(id: string) {
    const legendaryCardDocument = await this.legendaryCardCollection.findOne({ id });
    if (legendaryCardDocument) {
      return new Card(legendaryCardDocument);
    }
    return null;
  }
  @errorHandler('Не удалось легендарную карту')
  public async removeLegendaryCardById(id: string) {
    await this.legendaryCardCollection.deleteOne({ id });
  }
  @errorHandler('Не удалось сохранить легендарную карту')
  public async addLegendaryCard(card: Card) {
    await this.legendaryCardCollection.insertOne(card.getView());
  }
  @errorHandler('Не удалось сохранить результат операции')
  public async savePutCardResult(userFrom: User, userTo: User, spaceFrom?: Space, legendaryCardId?: string) {
    const session = this.client.startSession();
    try {
      const viewUserFrom = userFrom.getView();
      const viewUserTo = userTo.getView();
      const revisionUserFrom = this.revisions.get(userFrom);
      const revisionUserTo = this.revisions.get(userTo);
      if (!revisionUserFrom || !revisionUserTo) {
        throw new Error('Не удалось получить ревизию одного из пользователей');
      }
      await this.userCollection.updateOne(
        { id: userFrom.id, revision: revisionUserFrom },
        { $set: { ...viewUserFrom, revision: revisionUserFrom + 1 } },
        { session },
      );
      await this.userCollection.updateOne(
        { id: userTo.id, revision: revisionUserTo },
        { $set: { ...viewUserTo, revision: revisionUserTo + 1 } },
        { session },
      );
      if (spaceFrom) {
        const spaceView = spaceFrom.getView();
        const spaceRevision = this.revisions.get(spaceFrom);
        if (!spaceRevision) {
          throw new Error('Не удалось получить ревизию пространства');
        }
        await this.spaceCollection.updateOne(
          { id: spaceView.id, revision: spaceRevision },
          { $set: { ...spaceView, revision: spaceRevision + 1 } },
          { session },
        );
      }
      if (legendaryCardId) {
        await this.legendaryCardCollection.deleteOne({ id: legendaryCardId }, { session });
      }
    } finally {
      session.endSession();
    }
  }
}
