import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import HelloEntity from '../../../shared/infra/db/typeorm/schemas/HelloEntity';
import Hello from '../../domain/Hello';

@injectable()
@EntityRepository(HelloEntity)
class HelloRepository extends Repository<Hello> {}

export default HelloRepository;
