import { ExpressServer } from '@eusebiu_gagea/mem';
import 'reflect-metadata';
import cors from 'cors';
import bodyParser from 'body-parser';
import { injectable } from 'inversify';
import passport from 'passport';
import { port } from '../../../config/index';
import applyJWTStrategy from './http/auth/jwtStrategy';
import { logErrors } from './http/middlewares';
import Logger from './logger/Logger';

export const corsUrl = process.env.CORS_URL;
@injectable()
class Server extends ExpressServer {
  constructor(controllers: any[]) {
    super(controllers, { logger: Logger }, { port });
  }

  async setupMiddlewares(): Promise<void> {
    this.useMiddleware(bodyParser.json({ limit: '10mb' }));
    this.useMiddleware(
      bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
    );
    this.useMiddleware(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

    // Authentication
    applyJWTStrategy(passport);
    this.useMiddleware(passport.initialize());
  }

  async setupErrorMiddlewares(): Promise<void> {
    this.useErrorMiddleware(logErrors);
  }
}

export default Server;
