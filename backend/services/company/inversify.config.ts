import 'reflect-metadata';
import { Container } from 'inversify';
import { ILogger } from '../../common/Logger/Logger.interface';
import { LoggerService } from '../../common/Logger/LoggerService';
import { IAdministratorsServer } from './grpc/administrators_grpc_pb';
import { Administrator } from './services/Administrator';
import { TYPES } from './inversify.types';
import { IAdministratorService } from './domain/service/Administrator/AdministratorService.interface';
import { AdministratorService } from './domain/service/Administrator/AdministratorService';
import { IAuthService } from 'root/backend/common/AuthService/AuthService.interface';
import { AuthService } from '../../common/AuthService/implementation/AuthService';
import { INotifier } from 'common/Notifier/Notifier.interface';
import { Notifier } from './services/Notifier';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<ILogger>(TYPES.LoggerService).to(LoggerService);
container.bind<IAdministratorsServer>(TYPES.AdministratorGRPCService).to(Administrator as any);
container.bind<IAdministratorService>(TYPES.AdministratorService).to(AdministratorService);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<INotifier>(TYPES.Notifier).to(Notifier);

export { container, TYPES };
