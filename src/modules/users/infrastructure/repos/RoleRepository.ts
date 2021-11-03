import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import Role from '../../../../models/Role';

@injectable()
@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
