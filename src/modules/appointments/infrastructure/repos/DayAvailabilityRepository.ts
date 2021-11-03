import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import DayAvailability from '../../../../models/DayAvailability';

@injectable()
@EntityRepository(DayAvailability)
class DayAvailabilityRepository extends Repository<DayAvailability> {}

export default DayAvailabilityRepository;
