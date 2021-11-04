import { Handler, Query, QueryHandler } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';

@Query()
export class GetAppointmentsQuery {
  userId: number;
}

@injectable()
@QueryHandler(GetAppointmentsQuery)
class GetAppointmentsQueryHandler implements Handler<GetAppointmentsQuery, any> {
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;

  async handle(query: GetAppointmentsQuery) {
    const appointments = await this._appointmentsRepo.find({
      where: [{ professor: { id: query.userId } }, { student: { id: query.userId } }],
      relations: ['student', 'professor', 'status'],
    });

    return appointments;
  }
}

export default GetAppointmentsQueryHandler;
