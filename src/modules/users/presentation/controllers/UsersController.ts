import { GetUserByIdQuery } from './../../application/queries/GetUserByIdQuery';
import { Controller, MemMediator, HttpOk, createEvent, Get } from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
@Controller('users')
class AuthController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get(':userId')
  public async getUserById(req: Request, res: Response) {
    const userId = (req.params as any).userId as number;
    const result = await this._mediator.send(createEvent(GetUserByIdQuery, { userId }));

    return HttpOk(result);
  }
}

export default AuthController;
