import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import AppointmentStatus from '../../../../models/AppointmentStatus';

@injectable()
@EntityRepository(AppointmentStatus)
class AppointmentStatusRepository extends Repository<AppointmentStatus> {}

export default AppointmentStatusRepository;
