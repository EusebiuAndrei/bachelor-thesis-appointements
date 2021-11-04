import { AppointmentStatusChangedEvent } from './../events/AppointmentStatusChangedEvent';
import { AppointmentStatusEnum } from './../../../../models/AppointmentStatus';
import { rejectAppointment } from './../../domain/Appointment';
import { Handler, CommandHandler, Command, MemMediator, createEvent } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';
import AppointmentStatusRepository from '../../infrastructure/repos/AppointmentStatusRepository';

@Command()
export class RejectAppointmentCommand {
  appointmentId: number;
  userId: number;
}

@injectable()
@CommandHandler(RejectAppointmentCommand)
class RejectAppointmentCommandHandler implements Handler<RejectAppointmentCommand, any> {
  @inject(MemMediator) private _mediator: MemMediator;
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;
  @inject(AppointmentStatusRepository) private _appointmentsStatusRepo: AppointmentStatusRepository;

  async handle(command: RejectAppointmentCommand) {
    const appointment = await this._appointmentsRepo.findOne(command.appointmentId, {
      relations: ['professor', 'student', 'status'],
    });
    const rejectedStatus = await this._appointmentsStatusRepo.findOne(
      AppointmentStatusEnum.REJECTED,
    );
    appointment.status = rejectedStatus;

    rejectAppointment(appointment, command.userId);

    await this._appointmentsRepo.save(appointment);

    this._mediator.send(createEvent(AppointmentStatusChangedEvent, command));

    return appointment;
  }
}

export default RejectAppointmentCommandHandler;
