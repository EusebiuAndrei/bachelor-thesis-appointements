import { UseError, Controller, Get, Use, Ok, createEvent, MemMediator } from '@eusebiu_gagea/mem';
import { GetHelloQuery } from '../../application/queries/GetHelloQuery';
import { Request, Response, ErrorRequestHandler } from 'express';
import { inject, injectable } from 'inversify';
import { authorize, tryMiddleware } from '../../../shared/infra/http/middlewares';

const abc: ErrorRequestHandler = (err, req, res, next) => {
  console.log('== HERE ==');
  console.log(err);
  next(err);
};

@injectable()
@Use(authorize, tryMiddleware)
@UseError(abc)
@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async getHello(req: Request, res: Response): Promise<Ok> {
    const result = await this._mediator.send(createEvent(GetHelloQuery, { type: 1 }));
    // throw new Error('some');
    // throw new BadRequestException();
    return new Ok(result);
  }
}

export default HelloController;
