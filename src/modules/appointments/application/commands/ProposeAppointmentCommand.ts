import { AppointmentStatusEnum } from './../../../../models/AppointmentStatus';
import { proposeAppointment } from './../../domain/Appointment';
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import UserRepository from '../../../../modules/users/infrastructure/repos/UserRepository';
import Appointment from '../../../../models/Appointment';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';
import AppointmentStatusRepository from '../../infrastructure/repos/AppointmentStatusRepository';

@Command()
export class ProposeAppointmentCommand {
  startDate: Date;
  duration: number;
  description: string;
  professorId: number;
  studentId: number;
}

@injectable()
@CommandHandler(ProposeAppointmentCommand)
class ProposeAppointmentCommandHandler implements Handler<ProposeAppointmentCommand, any> {
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;
  @inject(AppointmentStatusRepository) private _appointmentsStatusRepo: AppointmentStatusRepository;
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: ProposeAppointmentCommand) {
    const professor = await this._userRepo.findOne(command.professorId, {
      relations: ['role'],
    });
    const student = await this._userRepo.findOne(command.studentId, {
      relations: ['role'],
    });
    const status = await this._appointmentsStatusRepo.findOne(AppointmentStatusEnum.APPROVED);

    const appointment = new Appointment();
    appointment.startDate = command.startDate;
    appointment.duration = command.duration;
    appointment.description = command.description;
    appointment.professor = professor;
    appointment.student = student;
    appointment.status = status;

    proposeAppointment(appointment);

    await this._appointmentsRepo.save(appointment);

    return appointment;
  }
}

export default ProposeAppointmentCommandHandler;
