import Appointment from '../../../models/Appointment';

export const proposeAppointment = (appointment: Appointment) => {
  if (appointment.student.role.code === 'PROFESSOR') {
    throw new AppointmentNotProposedByStudentException();
  }

  if (appointment.professor.role.code === 'STUDENT') {
    throw new AppointmentNotSentToProfessorException();
  }

  if (appointment.duration > 45) {
    throw new AppointmentDurationExceededException();
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
