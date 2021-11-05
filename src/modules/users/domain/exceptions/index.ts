export class ProfessorRestrictedException extends Error {
  constructor() {
    super(`This operation is available only for professors`);
  }
}
