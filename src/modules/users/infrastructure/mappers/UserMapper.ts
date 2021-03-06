import { UserDto } from './../../presentation/dtos/models';
import User from '../../domain/entities/User';

class UserMapper {
  toDto(user: User): UserDto {
    const dtoUser = { ...user };
    delete dtoUser['password'];

    return dtoUser;
  }
}

export default new UserMapper();
