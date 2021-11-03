import { Controller, Post, MemMediator, Ok, createEvent } from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { LoginCommand } from '../../application/commands/LoginCommand';
import { RegisterCommand } from '../../application/commands/RegisterCommand';

@injectable()
@Controller('auth')
class AuthController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Post('/login')
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._mediator.send(createEvent(LoginCommand, { email, password }));

    return new Ok(result);
  }

  @Post('/register')
  public async register(req: Request, res: Response) {
    const result = await this._mediator.send(createEvent(RegisterCommand, { user: req.body }));

    return new Ok(result);
  }
}

export default AuthController;
