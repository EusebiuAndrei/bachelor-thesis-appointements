import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../../../../models/Appointment';

@injectable()
@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {}

export default AppointmentRepository;
