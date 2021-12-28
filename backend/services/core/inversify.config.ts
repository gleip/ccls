import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

import type { AuthToolkitService } from './domain/ports/output/authToolkit.service';
import type { CardGenerator } from './domain/ports/output/cardGenerator.service';
import type { ToolkitService } from './domain/ports/output/toolkit.service';
import type { CoreRepository } from './domain/ports/output/core.repository';
import type { NotifierService } from './domain/ports/output/notifier.service';

import { UserService } from './domain/services/User.service';
import { LoggerService, Logger } from 'common/Logger';
import { AuthToolkit } from 'common/AuthToolkit';
import { Notifier } from 'common/Notifier';
import { Toolkit } from 'common/Toolkit';
import { Repository } from './repository';

const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<CoreRepository>(TYPES.CoreRepository).to(Repository);
container.bind<CardGenerator>(TYPES.CardGenerator).toConstantValue({} as any);
container.bind<LoggerService>(TYPES.LoggerService).to(Logger);
container.bind<AuthToolkitService>(TYPES.AuthService).to(AuthToolkit);
container.bind<ToolkitService>(TYPES.Toolkit).to(Toolkit);
container.bind<NotifierService>(TYPES.Notifier).to(Notifier);

export { container, TYPES };
