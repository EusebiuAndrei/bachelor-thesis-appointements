import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import User from '../../../../models/User';

@injectable()
@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
