import { inject } from 'inversify';
import { Controller, Created, createEvent, Get, MemMediator, Ok, Post } from '@eusebiu_gagea/mem';
import { GetHelloQuery } from '../../application/queries/GetHelloQuery';
import { CreateHelloCommand } from '../../application/commands/CreateHelloCommand';

@Controller('hello')
class HelloController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async findHellos() {
    const result = await this._mediator.send(createEvent(GetHelloQuery, {}));

    return new Ok(result);
  }

  @Post()
  public async createHello() {
    const result = await this._mediator.send(createEvent(CreateHelloCommand, {}));

    return new Created(result);
  }
}

export default HelloController;
