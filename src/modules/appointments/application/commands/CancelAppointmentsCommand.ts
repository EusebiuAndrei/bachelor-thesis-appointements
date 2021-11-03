import { cancelAppointment } from './../../domain/Appointment';
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import UserRepository from '../../../../modules/users/infrastructure/repos/UserRepository';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';
import AppointmentStatusRepository from '../../infrastructure/repos/AppointmentStatusRepository';

@Command()
export class CancelAppointmentsCommand {
  appointmentId: number;
  userId: number;
}

@injectable()
@CommandHandler(CancelAppointmentsCommand)
class CancelAppointmentsCommandHandler implements Handler<CancelAppointmentsCommand, any> {
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;
  @inject(AppointmentStatusRepository) private _appointmentsStatusRepo: AppointmentStatusRepository;
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: CancelAppointmentsCommand) {
    const appointment = await this._appointmentsRepo.findOne(command.appointmentId, {
      relations: ['professor', 'student', 'status'],
    });
    const canceledStatus = await this._appointmentsStatusRepo.findOne(4);
    appointment.status = canceledStatus;

    cancelAppointment(appointment, command.userId);

    await this._appointmentsRepo.save(appointment);

    return appointment;
  }
}

export default CancelAppointmentsCommandHandler;
