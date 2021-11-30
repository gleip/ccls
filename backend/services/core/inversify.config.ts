import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerService, Logger } from '../../common/Logger';
import { TYPES } from './inversify.types';
import { AuthToolkit } from '../../common/AuthToolkit';
import { AuthToolkitService } from './domain/ports/output/authToolkit.service';
import { UserService } from './domain/services/User.service';
import { CardGenerator } from './domain/ports/output/cardGenerator.service';
import { Toolkit } from '../../common/Toolkit';
import { ToolkitService } from './domain/ports/output/toolkit.service';
import { CoreRepository } from './domain/ports/output/core.repository';
import { NotifierService } from './domain/ports/output/notifier.service';
import { Notifier } from '../../common/Notifier';
import { Repository } from '../../services/core/repository';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<CoreRepository>(TYPES.CoreRepository).to(Repository);
container.bind<CardGenerator>(TYPES.CardGenerator).toConstantValue({} as any);
container.bind<LoggerService>(TYPES.LoggerService).to(Logger);
container.bind<AuthToolkitService>(TYPES.AuthService).to(AuthToolkit);
container.bind<ToolkitService>(TYPES.Toolkit).to(Toolkit);
container.bind<NotifierService>(TYPES.Notifier).to(Notifier);

export { container, TYPES };
