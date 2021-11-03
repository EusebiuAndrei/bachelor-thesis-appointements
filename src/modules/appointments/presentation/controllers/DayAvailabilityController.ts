import { GetDaysAvailabilityQuery } from './../../application/queries/GetDaysAvailabilityQuery';
import { CreateDayAvailabilityCommand } from './../../application/commands/CreateDayAvailabilityCommand';
import { Controller, Post, MemMediator, Ok, createEvent, Use, Get } from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authorize } from '../../../shared/infra/http/middlewares';
import CreateDayAvailabilityDto from '../dtos/CreateDayAvailabilityDto';

@injectable()
@Controller('day-availability')
class DayAvailabilityController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Use(authorize)
  @Get()
  public async findAll(req: Request, res: Response) {
    const userId = (req.user as any).id;

    const result = await this._mediator.send(createEvent(GetDaysAvailabilityQuery, { userId }));

    return new Ok(result);
  }

  @Use(authorize)
  @Post()
  public async create(req: Request, res: Response) {
    const userId = (req.user as any).id;
    console.log('USER', userId);
    const createDayAvailabilityDto = req.body as CreateDayAvailabilityDto;

    const result = await this._mediator.send(
      createEvent(CreateDayAvailabilityCommand, { ...createDayAvailabilityDto, userId }),
    );

    return new Ok(result);
  }
}

export default DayAvailabilityController;
