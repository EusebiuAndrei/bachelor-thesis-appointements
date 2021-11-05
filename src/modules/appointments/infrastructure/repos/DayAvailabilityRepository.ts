import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import DayAvailability from '../../domain/DayAvailability';
import DayAvailabilityEntity from '../../../shared/infra/db/typeorm/schemas/DayAvailabilityEntity';

@injectable()
@EntityRepository(DayAvailabilityEntity)
class DayAvailabilityRepository extends Repository<DayAvailability> {}

export default DayAvailabilityRepository;
