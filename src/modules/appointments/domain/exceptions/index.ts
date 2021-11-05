export class AppointmentNotProposedByStudentException extends Error {
  constructor() {
    super('An appointment should only be proposed by a student');
  }
}

export class AppointmentNotSentToProfessorException extends Error {
  constructor() {
    super('An appointment should only be sent to a professor');
  }
}

export class AppointmentDurationExceededException extends Error {
  constructor() {
    super(`An appointment shouldn't be longer than 45 minutes`);
  }
}

export class NotAppointmentParticipantException extends Error {
  constructor() {
    super(`An appointment can be canceled only by a participant`);
  }
}
