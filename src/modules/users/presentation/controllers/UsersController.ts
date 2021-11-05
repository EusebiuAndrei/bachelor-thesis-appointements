import { GetUserByIdQuery } from './../../application/queries/GetUserByIdQuery';
import { Controller, Post, MemMediator, HttpOk, createEvent } from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
@Controller('users')
class AuthController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Post(':userId')
  public async login(req: Request, res: Response) {
    const userId = (req.params as any).userId as number;
    const result = await this._mediator.send(createEvent(GetUserByIdQuery, { userId }));

    return HttpOk(result);
  }
}

export default AuthController;
