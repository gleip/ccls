import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerService, Logger } from '../../common/Logger';
import { TYPES } from './inversify.types';
import { AuthToolkitService, AuthToolkit } from '../../common/AuthToolkit';
import { UserService } from './domain/services/User.service';
import { UserRepository } from './domain/ports/user.repository';
import { RoleRepository } from './domain/ports/role.repository';
import { SpaceRepository } from './domain/ports/space.repository';
import { CardGenerator } from './domain/ports/cardGenerator.service';
import { LegendaryCardRepository } from './domain/ports/legendaryCard.repository';
import { Toolkit, ToolkitService } from '../../common/Toolkit';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).toConstantValue({} as any);
container.bind<RoleRepository>(TYPES.RoleRepository).toConstantValue({} as any);
container.bind<SpaceRepository>(TYPES.SpaceRepository).toConstantValue({} as any);
container.bind<CardGenerator>(TYPES.CardGenerator).toConstantValue({} as any);
container.bind<LegendaryCardRepository>(TYPES.LegendaryCardRepository).toConstantValue({} as any);
container.bind<LoggerService>(TYPES.LoggerService).to(Logger);
container.bind<AuthToolkitService>(TYPES.AuthService).to(AuthToolkit);
container.bind<ToolkitService>(TYPES.Toolkit).to(Toolkit);

export { container, TYPES };
