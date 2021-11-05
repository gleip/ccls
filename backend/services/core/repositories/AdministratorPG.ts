import { injectable, inject } from 'inversify';
import { IAdministratorRepository } from '../domain/ports/repository';
import { errorHandling } from '../../../common/decorators';
import { Pool } from 'pg';
import * as sqlBricks from 'sql-bricks';
import { TYPES } from '../inversify.types';
import { ILogger } from 'root/backend/common/Logger/Logger.interface';
import { Administrator } from '../domain/aggregates/Administrator';
import { and, or } from 'sql-bricks';

interface IRow {
  id: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  avatar?: string;
  phone?: string;
  active: boolean;
  created: Date;
  updated: Date;
  password?: string;
  refresh?: string;
  verificationcode?: string;
}

@injectable()
export class AdministratorPGRepository implements IAdministratorRepository {
  private table = 'administrators';
  private pool: Pool;
  private createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${this.table} (
      id               uuid      PRIMARY KEY,
      email            text      UNIQUE NOT NULL,
      name             text      NOT NULL,
      surname          text      NOT NULL,
      patronymic       text      NOT NULL,
      avatar           text      DEFAULT '', 
      phone            text,
      password         text,
      refresh          text,
      verificationCode text,
      active           boolean   NOT NULL,
      created          timestamp NOT NULL,
      updated          timestamp NOT NULL
    )
  `;
  constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
    if (!process.env.PG_CONNECTION_STRING) {
      throw new Error('Не переданы настройки подключения к СУБД');
    }
    this.pool = new Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });

    this.pool.query(this.createTableQuery).catch(async error => {
      this.logger.fatal(error);
      await this.pool.end();
      process.exit(1);
    });

    this.pool.on('error', async error => {
      this.logger.fatal('AdministratorPGRepository', error);
      await this.pool.end();
      process.exit(1);
    });
    this.pool.on('connect', error => {
      this.logger.info('Connection to DBMS established');
    });
  }

  private async insert(params: IRow) {
    return this.pool.query(sqlBricks.insert(this.table, params).toString());
  }

  @errorHandling('Ошибка при создании нового администратора')
  public async save(administrator: Administrator) {
    const { role, ...serializedAdministrator } = administrator.serialize();
    const exist = await this.pool.query(
      sqlBricks
        .select()
        .from(this.table)
        .where({ email: serializedAdministrator.email })
        .toParams(),
    );
    if (exist.rowCount > 0) {
      throw new Error('Администратор с таким email уже существует');
    }
    await this.insert(serializedAdministrator);
  }

  @errorHandling('Ошибка при обновлении администратора')
  public async update(administrator: Administrator) {
    const { role, id, ...serializedAdministrator } = administrator.serialize();
    await this.pool.query(
      sqlBricks
        .update(this.table, serializedAdministrator)
        .where({ id })
        .toString(),
    );
  }

  @errorHandling('Ошибка при удалении администратора')
  public async delete(administratorId: string) {
    await this.pool.query(
      sqlBricks
        .update(this.table, { active: false, refresh: null, verificationcode: null })
        .where({ id: administratorId })
        .toString(),
    );
  }

  private async getOne(
    params: { id: string } | { email: string } | { refresh: string } | { email: string; verificationcode: string },
  ) {
    const queryResult = await this.pool.query(
      sqlBricks
        .select()
        .from(this.table)
        .where(or(and({ ...params, active: true }), and({ ...params, password: null })))
        .toParams(),
    );
    if (queryResult.rowCount === 0) {
      throw new Error(`Администратора с таким ${JSON.stringify(params)} не найдено`);
    }
    const row = queryResult.rows[0] as IRow;
    return new Administrator(row);
  }

  @errorHandling('Ошибка при получении администратора')
  public async getByEmail(email: string) {
    const result = await this.getOne({ email });
    return result;
  }

  @errorHandling('Ошибка при получении администратора')
  public async getById(id: string) {
    const result = await this.getOne({ id });
    return result;
  }

  @errorHandling('Ошибка при получении администратора')
  public async getByRefreshToken(refresh: string) {
    const result = await this.getOne({ refresh });
    return result;
  }

  @errorHandling('Ошибка при получении администратора')
  public async getByVerificationCode(email: string, verificationCode: string) {
    const result = await this.getOne({ email, verificationcode: verificationCode });
    return result;
  }

  @errorHandling('Ошибка при получении хеша пароля')
  public async getHashPassword(id: string) {
    const queryResult = await this.pool.query<{ password: string }>(
      sqlBricks
        .select()
        .from(this.table)
        .where({ id, active: true })
        .select('password')
        .toParams(),
    );
    if (queryResult.rowCount !== 1) {
      throw new Error('Администратор не найден или не активен');
    }
    return queryResult.rows[0].password;
  }

  @errorHandling('Ошибка при обновлении пароля')
  public async saveHashPassword(id: string, password: string) {
    await this.pool.query(
      sqlBricks
        .update(this.table, { password, active: true, verificationcode: null })
        .where({ id })
        .toParams(),
    );
  }

  @errorHandling('Ошибка при сохранении проверочного кода')
  public async saveVerificationCode(email: string, verificationCode: string | null) {
    await this.pool.query(
      sqlBricks
        .update(this.table, { verificationcode: verificationCode })
        .where({ email })
        .toParams(),
    );
  }

  @errorHandling('Ошибка при обновлении refresh токена')
  public async saveRefreshToken(id: string, refresh: string) {
    await this.pool.query(
      sqlBricks
        .update(this.table, { refresh })
        .where({ id, active: true })
        .toParams(),
    );
  }

  @errorHandling('Ошибка при получении списка администраторов')
  public async getList() {
    const result = await this.pool.query<IRow>(
      sqlBricks
        .select()
        .from(this.table)
        .where({ active: true })
        .toString(),
    );
    if (result.rowCount === 0) {
      throw new Error('Не найдено ни одного администратора');
    }
    return result.rows.map(row => new Administrator(row));
  }
}
