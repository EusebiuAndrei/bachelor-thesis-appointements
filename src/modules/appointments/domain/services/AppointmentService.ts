import UserService from '../../../users/domain/services/UserService';
import { ProfessorRestrictedException } from '../../../users/domain/exceptions';
import Appointment from '../entities/Appointment';
import {
  AppointmentApprovedOrRejectedStatusRestrictedException,
  AppointmentDurationExceededException,
  AppointmentNotProposedByStudentException,
  AppointmentNotSentToProfessorException,
  AppointmentProposedStatusRestrictedException,
  NotAppointmentParticipantException,
} from '../exceptions';
import { AppointmentStatusEnum } from '../entities/AppointmentStatus';

/*
  AppointmentProposedEvent -> handler for this to automatically Approve or Reject an Appointment
  Appointment Approved/Rejected/Canceled Event -> handler for sending an appropriate mail to parties
  ApproveAppointmentCommand, RejectAppointmentCommand -> only for appointments with startDate out of the professor schedule
  CancelAppointmentsForDay -> only for professor 

  Check that constraint error --- create more appointments
*/

const AppointmentsService = (appointment: Appointment) => ({
  proposeAppointment() {
    if (UserService(appointment.student).isProfessor) {
      throw new AppointmentNotProposedByStudentException();
    }

    if (UserService(appointment.professor).isStudent) {
      throw new AppointmentNotSentToProfessorException();
    }

    if (appointment.duration > 45) {
      throw new AppointmentDurationExceededException();
    }
  },
  approveAppointment(userId: number) {
    if (appointment.professor.id !== userId && appointment.student.id !== userId) {
      throw new NotAppointmentParticipantException();
    }

    if (appointment.student.id === userId) {
      throw new ProfessorRestrictedException();
    }

    if (appointment.status.id !== AppointmentStatusEnum.PROPOSED) {
      throw new AppointmentProposedStatusRestrictedException();
    }
  },
  rejectAppointment(userId: number) {
    if (appointment.professor.id !== userId && appointment.student.id !== userId) {
      throw new NotAppointmentParticipantException();
    }

    if (appointment.student.id === userId) {
      throw new ProfessorRestrictedException();
    }

    if (appointment.status.id !== AppointmentStatusEnum.PROPOSED) {
      throw new AppointmentProposedStatusRestrictedException();
    }
  },
  cancelAppointment(userId: number) {
    if (appointment.professor.id !== userId && appointment.student.id !== userId) {
      throw new NotAppointmentParticipantException();
    }

    if (appointment.status.id !== AppointmentStatusEnum.PROPOSED) {
      throw new AppointmentApprovedOrRejectedStatusRestrictedException();
    }
  },
});

export default AppointmentsService;
