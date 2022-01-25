import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import AppointmentStatus from '../../domain/entities/AppointmentStatus';
import AppointmentStatusEntity from '../../../shared/infra/db/typeorm/schemas/AppointmentStatusEntity';

@injectable()
@EntityRepository(AppointmentStatusEntity)
class AppointmentStatusRepository extends Repository<AppointmentStatus> {}

export default AppointmentStatusRepository;
