import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../../domain/entities/Appointment';
import AppointmentEntity from '../../../shared/infra/db/typeorm/schemas/AppointmentEntity';

@injectable()
@EntityRepository(AppointmentEntity)
class AppointmentRepository extends Repository<Appointment> {}

export default AppointmentRepository;
