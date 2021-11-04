import { LeveledLogMethod } from 'winston';

interface ILogger {
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  debug: LeveledLogMethod;
}

export default ILogger;

export const LOGGER_SYMBOL = Symbol('Logger');
