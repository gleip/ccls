import { Server, ServerCredentials } from '@grpc/grpc-js';
import { ILogger } from 'root/backend/common/Logger/Logger.interface';
import { container, TYPES } from './inversify.config';
import { AdministratorsService } from './services/Administrator';

const server: Server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1,
});

server.addService(AdministratorsService, container.get(TYPES.AdministratorGRPCService));
const logger = container.get<ILogger>(TYPES.LoggerService);

server.bindAsync(`0.0.0.0:5000`, ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  logger.info(`gRPC:Server:${bindPort}`);
  server.start();
});