import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import Role from '../../domain/Role';
import RoleEntity from '../../../shared/infra/db/typeorm/schemas/RoleEntity';

@injectable()
@EntityRepository(RoleEntity)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
