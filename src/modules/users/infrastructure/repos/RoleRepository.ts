import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import RoleEntity from '../../../shared/infra/db/typeorm/schemas/RoleEntity';
import Role from '../../domain/entities/Role';

@injectable()
@EntityRepository(RoleEntity)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
