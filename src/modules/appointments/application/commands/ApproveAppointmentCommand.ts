import { AppointmentStatusChangedEvent } from './../events/AppointmentStatusChangedEvent';
import { AppointmentStatusEnum } from '../../domain/entities/AppointmentStatus';
import AppointmentsService from '../../domain/services/AppointmentService';
import { Handler, CommandHandler, Command, MemMediator, createEvent } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';
import AppointmentStatusRepository from '../../infrastructure/repos/AppointmentStatusRepository';

@Command()
export class ApproveAppointmentCommand {
  appointmentId: number;
  userId: number;
}

@injectable()
@CommandHandler(ApproveAppointmentCommand)
class ApproveAppointmentCommandHandler implements Handler<ApproveAppointmentCommand, any> {
  @inject(MemMediator) private _mediator: MemMediator;
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;
  @inject(AppointmentStatusRepository) private _appointmentsStatusRepo: AppointmentStatusRepository;

  async handle(command: ApproveAppointmentCommand) {
    const appointment = await this._appointmentsRepo.findOne(command.appointmentId, {
      relations: ['professor', 'student', 'status'],
    });
    const approvedStatus = await this._appointmentsStatusRepo.findOne(
      AppointmentStatusEnum.APPROVED,
    );
    appointment.status = approvedStatus;

    AppointmentsService(appointment).approveAppointment(command.userId);

    await this._appointmentsRepo.save(appointment);

    this._mediator.emit(createEvent(AppointmentStatusChangedEvent, command));

    return appointment;
  }
}

export default ApproveAppointmentCommandHandler;
