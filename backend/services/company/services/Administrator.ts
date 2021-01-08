import { IAdministratorsServer, AdministratorsService } from '../grpc/administrators_grpc_pb';
import {
  CreateRequest,
  AdministratorMessage,
  SignInRequest,
  AuthResponse,
  SetPasswordRequest,
  Empty,
  RefreshTokenRequest,
  DeleteRequest,
  AdministratorsResponse,
} from '../grpc/administrators_pb';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify.types';
import { IAdministratorService } from '../domain/service';
import { ILogger } from '../../../common/Logger/Logger.interface';
import { IAdministrator } from 'root/domain';

@injectable()
export class Administrator implements IAdministratorsServer {
  [method: string]: any;
  constructor(
    @inject(TYPES.AdministratorService) private administratorService: IAdministratorService,
    @inject(TYPES.LoggerService) private logger: ILogger,
  ) {}
  private errorHandling(error: unknown, callback: sendUnaryData<any>) {
    if (error instanceof Error) {
      callback({
        message: error.message,
        name: 'error',
      });
      return;
    }
    this.logger.error(error);
    callback({
      message: JSON.stringify(error),
      name: 'error',
    });
  }

  private getAdministratorMessage(administrator: IAdministrator) {
    return new AdministratorMessage()
      .setId(administrator.id)
      .setEmail(administrator.email)
      .setActive(administrator.active)
      .setAvatar(administrator.avatar)
      .setCreated(administrator.created.toISOString())
      .setUpdated(administrator.updated.toISOString())
      .setName(administrator.name)
      .setSurname(administrator.surname)
      .setPatronymic(administrator.patronymic)
      .setPhone(administrator.phone)
      .setRole(administrator.role);
  }

  public async create(
    call: ServerUnaryCall<CreateRequest, AdministratorMessage>,
    callback: sendUnaryData<AdministratorMessage>,
  ) {
    try {
      const request = call.request.toObject();
      const result = await this.administratorService.create(request);
      const response = this.getAdministratorMessage(result);
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async signIn(call: ServerUnaryCall<SignInRequest, AuthResponse>, callback: sendUnaryData<AuthResponse>) {
    try {
      const request = call.request.toObject();
      const { expired, refreshToken, token } = await this.administratorService.signIn(request);
      const response = new AuthResponse()
        .setToken(token)
        .setRefreshtoken(refreshToken)
        .setExpired(expired.toISOString());
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async setPassword(call: ServerUnaryCall<SetPasswordRequest, Empty>, callback: sendUnaryData<Empty>) {
    try {
      const { email, password, verificationcode } = call.request.toObject();
      await this.administratorService.setPassword({
        email,
        password,
        verificationCode: verificationcode,
      });
      const response = new Empty();
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async refreshToken(
    call: ServerUnaryCall<RefreshTokenRequest, AuthResponse>,
    callback: sendUnaryData<AuthResponse>,
  ) {
    try {
      const { refresh } = call.request.toObject();
      const { expired, refreshToken, token } = await this.administratorService.refreshToken({ refreshToken: refresh });
      const response = new AuthResponse()
        .setToken(token)
        .setRefreshtoken(refreshToken)
        .setExpired(expired.toISOString());
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async update(
    call: ServerUnaryCall<AdministratorMessage, AdministratorMessage>,
    callback: sendUnaryData<AdministratorMessage>,
  ) {
    try {
      const request = call.request.toObject();
      const result = await this.administratorService.update(request);
      const response = this.getAdministratorMessage(result);
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async delete(call: ServerUnaryCall<DeleteRequest, Empty>, callback: sendUnaryData<Empty>) {
    try {
      const { administratorid } = call.request.toObject();
      await this.administratorService.delete({ id: administratorid });
      const response = new Empty();
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }

  public async getList(
    call: ServerUnaryCall<Empty, AdministratorsResponse>,
    callback: sendUnaryData<AdministratorsResponse>,
  ) {
    try {
      const result = await this.administratorService.getList(null);
      const response = new AdministratorsResponse();
      const administrators = result.map(administrator => this.getAdministratorMessage(administrator));
      response.setAdministratorsList(administrators);
      callback(null, response);
    } catch (error) {
      this.errorHandling(error, callback);
    }
  }
}

export { AdministratorsService };
