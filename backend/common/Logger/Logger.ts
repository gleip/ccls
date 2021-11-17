import { injectable } from 'inversify';
import { LoggerService } from './LoggerService.interface';
import pino from 'pino';

@injectable()
export class Logger implements LoggerService {
  private pino: pino.Logger;
  constructor() {
    this.pino = pino({
      safe: true,
      level: (process.env.LOGLEVEL || 'info').toString(),
    });
  }
  debug(...args: any[]) {
    this.pino.debug(args);
  }
  error(...args: any[]) {
    this.pino.error(args);
  }
  fatal(...args: any[]) {
    this.pino.fatal(args);
  }
  info(...args: any[]) {
    this.pino.info(args);
  }
  trace(...args: any[]) {
    this.pino.trace(args);
  }
  warn(...args: any[]) {
    this.pino.warn(args);
  }
}
