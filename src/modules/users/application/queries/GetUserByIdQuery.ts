import { Handler, QueryHandler, Query } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import UserMapper from '../../infrastructure/mappers/UserMapper';
import UserRepository from '../../infrastructure/repos/UserRepository';

@Query()
export class GetUserByIdQuery {
  userId: number;
}

@injectable()
@QueryHandler(GetUserByIdQuery)
class GetUserByIdQueryHandler implements Handler<GetUserByIdQuery, any> {
  @inject(UserRepository) private _userRepo: UserRepository;
  async handle(query: GetUserByIdQuery) {
    const user = await this._userRepo.findOne(query.userId, {
      relations: ['role'],
    });

    return UserMapper.toDto(user);
  }
}

export default GetUserByIdQueryHandler;
