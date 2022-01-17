import UserService from '../../../users/domain/services/UserService';
import { ProfessorRestrictedException } from '../../../users/domain/exceptions';
import Appointment from '../entities/Appointment';
import {
  AppointmentDurationExceededException,
  AppointmentNotProposedByStudentException,
  AppointmentNotSentToProfessorException,
  NotAppointmentParticipantException,
} from '../exceptions';

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

    if (UserService(appointment.student).isStudent) {
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
  },
  rejectAppointment(userId: number) {
    if (appointment.professor.id !== userId && appointment.student.id !== userId) {
      throw new NotAppointmentParticipantException();
    }

    if (appointment.student.id === userId) {
      throw new ProfessorRestrictedException();
    }
  },
  cancelAppointment(userId: number) {
    if (appointment.professor.id !== userId && appointment.student.id !== userId) {
      throw new NotAppointmentParticipantException();
    }
  },
});

export default AppointmentsService;
