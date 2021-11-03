import User from '../../../models/User';
import Appointment from '../../../models/Appointment';

/*
  AppointmentProposedEvent -> handler for this to automatically Approve or Reject an Appointment
  Appointment Approved/Rejected/Canceled Event -> handler for sending an appropriate mail to parties
  ApproveAppointmentCommand, RejectAppointmentCommand -> only for appointments with startDate out of the professor schedule
  CancelAppointmentsForDay -> only for professor 

  Check that constraint error --- create more appointments
*/

export const isStudent = (user: User) => user.role.code === 'STUDENT';
export const isProfessor = (user: User) => user.role.code === 'PROFESSOR';

export const proposeAppointment = (appointment: Appointment) => {
  if (isProfessor(appointment.student)) {
    throw new AppointmentNotProposedByStudentException();
  }

  if (isStudent(appointment.professor)) {
    throw new AppointmentNotSentToProfessorException();
  }

  if (appointment.duration > 45) {
    throw new AppointmentDurationExceededException();
  }
};

export const cancelAppointment = (appointment: Appointment, userId: number) => {
  if (appointment.professor.id !== userId && appointment.student.id !== userId) {
    throw new NotAppointmentParticipantException();
  }
};

class AppointmentNotProposedByStudentException extends Error {
  constructor() {
    super('An appointment should only be proposed by a student');
  }
}

class AppointmentNotSentToProfessorException extends Error {
  constructor() {
    super('An appointment should only be sent to a professor');
  }
}

class AppointmentDurationExceededException extends Error {
  constructor() {
    super(`An appointment shouldn't be longer than 45 minutes`);
  }
}

class NotAppointmentParticipantException extends Error {
  constructor() {
    super(`An appointment can be canceled only by a participant`);
  }
}

// Not from here
export const checkProfessor = (user: User) => {
  if (isStudent(user)) {
    throw new ProfessorRestrictedException();
  }
};

class ProfessorRestrictedException extends Error {
  constructor() {
    super(`This operation is available only for professors`);
  }
}

/*
const createException = (message: string) => {
  return class extends Error {
    constructor() {
      super(message);
    }
  };
};

const MyException = createException('some');
*/
