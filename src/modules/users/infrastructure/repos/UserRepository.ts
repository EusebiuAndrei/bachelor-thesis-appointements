import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import User from '../../domain/entities/User';
import UserEntity from '../../../shared/infra/db/typeorm/schemas/UserEntity';

@injectable()
@EntityRepository(UserEntity)
class UserRepository extends Repository<User> {}

export default UserRepository;
