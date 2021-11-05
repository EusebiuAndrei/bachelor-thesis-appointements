import { GetAppointmentsQuery } from './../../application/queries/GetAppointmentsQuery';
import { RejectAppointmentCommand } from './../../application/commands/RejectAppointmentCommand';
import { ApproveAppointmentCommand } from './../../application/commands/ApproveAppointmentCommand';
import { CancelAppointmentCommand } from '../../application/commands/CancelAppointmentCommand';
import { ProposeAppointmentCommand } from './../../application/commands/ProposeAppointmentCommand';
import {
  Controller,
  Post,
  MemMediator,
  Ok,
  createEvent,
  Use,
  Delete,
  Get,
} from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import ProposeAppointmentDto from '../dtos/ProposeAppointmentDto';
import { authorize } from '../../../shared/infra/http/middlewares';

@injectable()
@Controller('appointments')
class AppointmentsController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Use(authorize)
  @Get()
  public async getAppointments(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const result = await this._mediator.send(createEvent(GetAppointmentsQuery, { userId }));

    return new Ok(result);
  }

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
  @Post(':appointmentId/approve')
  public async approveAppointment(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(ApproveAppointmentCommand, { userId, appointmentId }),
    );

    return new Ok(result);
  }

  @Use(authorize)
  @Post(':appointmentId/reject')
  public async rejectAppointment(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(RejectAppointmentCommand, { userId, appointmentId }),
    );

    return new Ok(result);
  }

  @Use(authorize)
  @Delete(':appointmentId')
  public async cancelOne(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(CancelAppointmentCommand, { userId, appointmentId }),
    );

    return new Ok(result);
  }
}

export default AppointmentsController;
