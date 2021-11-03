import { Controller, Get, Use, Ok, createEvent, MemMediator } from '@eusebiu_gagea/mem';
import { GetHelloQuery } from '../../application/queries/GetHelloQuery';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authorize, tryMiddleware } from '../../../shared/infra/http/middlewares';

@injectable()
@Use(authorize, tryMiddleware)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async getHello(req: Request, res: Response): Promise<Ok> {
    console.log('USER', req.user);
    const result = await this._mediator.send(createEvent(GetHelloQuery, { type: 1 }));
    // throw new Error('some');
    // throw new BadRequestException();
    return new Ok(result);
  }
}

export default HelloController;
