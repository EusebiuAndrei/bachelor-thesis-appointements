import { QueryHandler, Query, Handler } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import DayAvailabilityRepository from '../../infrastructure/repos/DayAvailabilityRepository';

@Query()
export class GetDaysAvailabilityQuery {
  public userId: number;
}

@injectable()
@QueryHandler(GetDaysAvailabilityQuery)
class GetDaysAvailabilityQueryHandler implements Handler<GetDaysAvailabilityQuery, any> {
  @inject(DayAvailabilityRepository) private _dayAvailabilityRepository: DayAvailabilityRepository;

  async handle(query: GetDaysAvailabilityQuery) {
    const result = await this._dayAvailabilityRepository.find({ user: { id: query.userId } });
    return result;
  }
}

export default GetDaysAvailabilityQueryHandler;
