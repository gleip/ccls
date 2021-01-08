import { injectable } from 'inversify';
import { ILogger } from './Logger.interface';
import * as pino from 'pino';

@injectable()
export class LoggerService implements ILogger {
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
