import { Handler, Query, QueryHandler } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import AppointmentRepository from '../../infrastructure/repos/AppointmentRepository';

@Query()
export class GetAppointmentByIdQuery {
  appointmentId: number;
}

@injectable()
@QueryHandler(GetAppointmentByIdQuery)
class GetAppointmentByIdQueryHandler implements Handler<GetAppointmentByIdQuery, any> {
  @inject(AppointmentRepository) private _appointmentsRepo: AppointmentRepository;

  async handle(query: GetAppointmentByIdQuery) {
    const appointment = await this._appointmentsRepo.findOne({
      where: [{ id: query.appointmentId }],
      relations: ['student', 'professor', 'status'],
    });

    return appointment;
  }
}

export default GetAppointmentByIdQueryHandler;
