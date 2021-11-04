import { AppointmentStatusEnum } from '../../../../models/AppointmentStatus';
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';
import IEmailService from '../../../../modules/shared/application/email/IEmalService';
import EmailService from '../../../../modules/shared/infra/email/EmailService';
import Email from '../../../../modules/shared/application/email/Email';

@Command()
export class AppointmentStatusChangedEvent {
  appointmentId: number;
  userId: number;
}

@injectable()
@CommandHandler(AppointmentStatusChangedEvent)
class AppointmentStatusChangedEventHandler implements Handler<AppointmentStatusChangedEvent, any> {
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;
  @inject(EmailService) private _emailService: IEmailService;

  async handle(event: AppointmentStatusChangedEvent) {
    const appointment = await this._appointmentsRepo.findOne(event.appointmentId, {
      relations: ['professor', 'student', 'status'],
    });

    switch (appointment.status.id) {
      case AppointmentStatusEnum.APPROVED: {
        const email: Email = {
          to: appointment.student.email,
          subject: `Appointment with ${appointment.professor.firstName} ${appointment.professor.lastName}`,
          content: `Your appointment on date ${appointment.startDate} has been approved.`,
        };

        this._emailService.sendEmail(email);
        return;
      }
      case AppointmentStatusEnum.REJECTED: {
        const email: Email = {
          to: appointment.student.email,
          subject: `Appointment with ${appointment.professor.firstName} ${appointment.professor.lastName}`,
          content: `Your appointment on date ${appointment.startDate} has been rejected.`,
        };

        this._emailService.sendEmail(email);
        return;
      }
      case AppointmentStatusEnum.CANCELED: {
        const to =
          appointment.student.id === event.userId
            ? appointment.professor.email
            : appointment.student.email;

        const email: Email = {
          to,
          subject: `Appointment with ${appointment.professor.firstName} ${appointment.professor.lastName}`,
          content: `Your appointment on date ${appointment.startDate} has been canceled.`,
        };

        this._emailService.sendEmail(email);
        return;
      }
      case AppointmentStatusEnum.PROPOSED:
      default: {
      }
    }
  }
}

export default AppointmentStatusChangedEventHandler;
