import DomainException from '../../../shared/domain/DomainException';

export class ProfessorRestrictedException extends DomainException {
  constructor() {
    super(`This operation is available only for professors`);
  }
}
