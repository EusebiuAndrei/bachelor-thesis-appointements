import { CancelAppointmentsCommand } from './../../application/commands/CancelAppointmentsCommand';
import { ProposeAppointmentCommand } from './../../application/commands/ProposeAppointmentCommand';
import { Controller, Post, MemMediator, Ok, createEvent, Use, Delete } from '@eusebiu_gagea/mem';
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

  @Use(authorize)
  @Delete('/:appointmentId')
  public async cancelOne(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(CancelAppointmentsCommand, { userId, appointmentId }),
    );

    return new Ok(result);
  }
}

export default AppointmentsController;
