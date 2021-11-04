import * as jsonwebtoken from 'jsonwebtoken';
import { injectable } from 'inversify';
import { promisify } from 'util';
import { IAuthService, IHashedPassword } from '../AuthService.interface';
import { Employee } from 'services/company/domain/aggregates';
import { pbkdf2, randomBytes, randomUUID } from 'crypto';

@injectable()
export class AuthService implements IAuthService {
  private JWT_TOKEN_SECRET: string;
  private JWT_TOKEN_TTL_IN_SECOND: number;
  private REFRESH_TOKEN_TTL_IN_SECOND: number;
  private getHash = promisify(pbkdf2);
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
    const refresh = randomUUID();
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
  public async comparePassword(password: string, { hash, salt }: IHashedPassword) {
    const hashedPassword = await this.getHash(password, salt, 10000, 512, 'sha512');
    return hashedPassword.toString('hex') === hash;
  }
  public async hashPassword(password: string) {
    const salt = randomBytes(32);
    const hash = await this.getHash(password, salt, 10000, 512, 'sha512');
    return { hash: hash.toString('hex'), salt: salt.toString('hex') };
  }
  public generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
