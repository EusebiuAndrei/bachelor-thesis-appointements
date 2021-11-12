import { GetAppointmentsQuery } from './../../application/queries/GetAppointmentsQuery';
import { RejectAppointmentCommand } from './../../application/commands/RejectAppointmentCommand';
import { ApproveAppointmentCommand } from './../../application/commands/ApproveAppointmentCommand';
import { CancelAppointmentCommand } from '../../application/commands/CancelAppointmentCommand';
import { ProposeAppointmentCommand } from './../../application/commands/ProposeAppointmentCommand';
import {
  Controller,
  Post,
  MemMediator,
  HttpOk,
  createEvent,
  Use,
  Delete,
  Get,
  HttpCreated,
} from '@eusebiu_gagea/mem';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { authorize } from '../../../shared/infra/http/middlewares';
import { ProposeAppointmentRequestDto } from '../dtos/requests';

@injectable()
@Controller('appointments')
class AppointmentsController {
  @inject(MemMediator) private _mediator: MemMediator;

  @Use(authorize)
  @Get()
  public async getAppointments(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const result = await this._mediator.send(createEvent(GetAppointmentsQuery, { userId }));

    return HttpOk(result);
  }

  @Use(authorize)
  @Post()
  public async create(req: Request, res: Response) {
    const studentId = (req.user as any).id;
    const proposeAppointmentDto = req.body as ProposeAppointmentRequestDto;

    const result = await this._mediator.send(
      createEvent(ProposeAppointmentCommand, { ...proposeAppointmentDto, studentId }),
    );

    return HttpCreated(result);
  }

  @Use(authorize)
  @Post(':appointmentId/approve')
  public async approveAppointment(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(ApproveAppointmentCommand, { userId, appointmentId }),
    );

    return HttpOk(result);
  }

  @Use(authorize)
  @Post(':appointmentId/reject')
  public async rejectAppointment(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(RejectAppointmentCommand, { userId, appointmentId }),
    );

    return HttpOk(result);
  }

  @Use(authorize)
  @Delete(':appointmentId')
  public async cancelOne(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const appointmentId = (req.params as any).appointmentId as number;

    const result = await this._mediator.send(
      createEvent(CancelAppointmentCommand, { userId, appointmentId }),
    );

    return HttpOk(result);
  }
}

export default AppointmentsController;
