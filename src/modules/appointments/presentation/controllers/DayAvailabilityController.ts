import { GetDaysAvailabilityQuery } from './../../application/queries/GetDaysAvailabilityQuery';
import { CreateDayAvailabilityCommand } from './../../application/commands/CreateDayAvailabilityCommand';
import {
  Controller,
  Post,
  MemMediator,
  HttpOk,
  createEvent,
  Use,
  Get,
  HttpCreated,
} from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authorize } from '../../../shared/infra/http/middlewares';
import { CreateDayAvailabilityRequestDto } from '../dtos/requests';

@injectable()
@Controller('day-availability')
class DayAvailabilityController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Use(authorize)
  @Get()
  public async findAll(req: Request, res: Response) {
    const userId = (req.user as any).id;

    const result = await this._mediator.send(createEvent(GetDaysAvailabilityQuery, { userId }));

    return HttpOk(result);
  }

  @Use(authorize)
  @Post()
  public async create(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const createDayAvailabilityDto = req.body as CreateDayAvailabilityRequestDto;

    const result = await this._mediator.send(
      createEvent(CreateDayAvailabilityCommand, { ...createDayAvailabilityDto, userId }),
    );

    return HttpCreated(result);
  }
}

export default DayAvailabilityController;
