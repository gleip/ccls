import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import * as uuid from 'uuid';
import { injectable } from 'inversify';
import { promisify } from 'util';
import { IAuthService } from './AuthService.interface';
import { Employee } from 'services/company/domain/aggregates';

@injectable()
export class AuthService implements IAuthService {
  private JWT_TOKEN_SECRET: string;
  private JWT_TOKEN_TTL_IN_SECOND: number;
  private REFRESH_TOKEN_TTL_IN_SECOND: number;
  private getHash = promisify(bcrypt.hash);
  constructor() {
    if (
      !process.env.JWT_TOKEN_SECRET ||
      !process.env.JWT_TOKEN_TTL_IN_SECOND ||
      !+process.env.JWT_TOKEN_TTL_IN_SECOND ||
      !process.env.REFRESH_TOKEN_TTL_IN_SECOND ||
      !+process.env.REFRESH_TOKEN_TTL_IN_SECOND
    ) {
      throw new Error('Не переданы параметры для генерации авторизационных токенов');
    }
    this.JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
    this.JWT_TOKEN_TTL_IN_SECOND = +process.env.JWT_TOKEN_TTL_IN_SECOND;
    this.REFRESH_TOKEN_TTL_IN_SECOND = +process.env.REFRESH_TOKEN_TTL_IN_SECOND;
  }
  public getAuth(employee: Employee) {
    const { id, role, spaceId, confirmed, email } = employee.getView();
    const token = jsonwebtoken.sign({ id, role, spaceId, confirmed, email }, this.JWT_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: this.JWT_TOKEN_TTL_IN_SECOND,
    });
    const refresh = uuid.v4();
    const expired = new Date();
    expired.setSeconds(expired.getSeconds() + this.JWT_TOKEN_TTL_IN_SECOND);
    return {
      refresh,
      auth: {
        token,
        refreshToken: jsonwebtoken.sign({ refresh }, this.JWT_TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: this.REFRESH_TOKEN_TTL_IN_SECOND,
        }),
        expired,
      },
    };
  }
  public async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
  public async hashPassword(password: string) {
    return this.getHash(password, 10);
  }
  public generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
