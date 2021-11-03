import { ProposeAppointmentCommand } from './../../application/commands/ProposeAppointmentCommand';
import { Controller, Post, MemMediator, Ok, createEvent, Use } from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import ProposeAppointmentDto from '../dtos/ProposeAppointmentDto';
import { authorize } from '../../../shared/infra/http/middlewares';

@injectable()
@Controller('appointments')
class AppointmentsController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Use(authorize)
  @Post()
  public async create(req: Request, res: Response) {
    const studentId = (req.user as any).id;
    const proposeAppointmentDto = req.body as ProposeAppointmentDto;

    const result = await this._mediator.send(
      createEvent(ProposeAppointmentCommand, { ...proposeAppointmentDto, studentId }),
    );

    return new Ok(result);
  }
}

export default AppointmentsController;
