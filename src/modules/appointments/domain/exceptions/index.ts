import DomainException from '../../../shared/domain/DomainException';

export class AppointmentNotProposedByStudentException extends DomainException {
  constructor() {
    super('An appointment should only be proposed by a student');
  }
}

export class AppointmentNotSentToProfessorException extends DomainException {
  constructor() {
    super('An appointment should only be sent to a professor');
  }
}

export class AppointmentDurationExceededException extends DomainException {
  constructor() {
    super(`An appointment shouldn't be longer than 45 minutes`);
  }
}

export class NotAppointmentParticipantException extends DomainException {
  constructor() {
    super(`An appointment can be canceled only by a participant`);
  }
}

export class AppointmentProposedStatusRestrictedException extends DomainException {
  constructor() {
    super(`The appointment should be in PROPOSED status in order to perform this operation on it`);
  }
}

export class AppointmentApprovedOrRejectedStatusRestrictedException extends DomainException {
  constructor() {
    super(
      `The appointment should be in APPROVED or REJECTED status in order to perform this operation on it`,
    );
  }
}
