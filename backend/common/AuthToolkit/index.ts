import * as jsonwebtoken from 'jsonwebtoken';
import { injectable } from 'inversify';
import { promisify } from 'util';
import { AuthToolkitService, IHashedInfo } from '../../services/core/domain/ports/output/authToolkit.service';
import { User } from '../../services/core/domain/aggregates/User';
import { pbkdf2, randomBytes, randomUUID } from 'crypto';
import { ConfigurableService } from '../ConfigurableService';

@injectable()
export class AuthToolkit extends ConfigurableService implements AuthToolkitService {
  private readonly iterations = 10000;
  private readonly keylen = 256;
  private readonly hashAlgorithm = 'sha256';
  private readonly jwtAlgorithm = 'HS256';
  private readonly saltLength = 32;
  private JWT_TOKEN_SECRET: string;
  private JWT_TOKEN_TTL_IN_SECOND: number;
  private REFRESH_TOKEN_TTL_IN_SECOND: number;
  private _getHash = promisify(pbkdf2);
  constructor() {
    super();
    this.JWT_TOKEN_SECRET = this.getSettingFromEnv('JWT_TOKEN_SECRET');
    this.JWT_TOKEN_TTL_IN_SECOND = this.castToNumber(this.getSettingFromEnv('JWT_TOKEN_TTL_IN_SECOND'));
    this.REFRESH_TOKEN_TTL_IN_SECOND = this.castToNumber(this.getSettingFromEnv('REFRESH_TOKEN_TTL_IN_SECOND'));
  }
  public getAuthInfo(user: User) {
    const { id, role, spaceId, email } = user.getView();
    const token = jsonwebtoken.sign({ id, role, spaceId, email }, this.JWT_TOKEN_SECRET, {
      algorithm: this.jwtAlgorithm,
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
          algorithm: this.jwtAlgorithm,
          expiresIn: this.REFRESH_TOKEN_TTL_IN_SECOND,
        }),
        expired,
      },
    };
  }
  private getString(value: Buffer) {
    return value.toString('hex');
  }
  public async compare(password: string, { hash, salt }: IHashedInfo) {
    const hashedPassword = await this._getHash(password, salt, this.iterations, this.keylen, this.hashAlgorithm);
    return this.getString(hashedPassword) === hash;
  }
  public async getHash(password: string) {
    const salt = this.getString(randomBytes(this.saltLength));
    const hash = await this._getHash(password, salt, this.iterations, this.keylen, this.hashAlgorithm);
    return { hash: this.getString(hash), salt };
  }
  public generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
