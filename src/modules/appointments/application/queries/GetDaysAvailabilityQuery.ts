import { QueryHandler, Query, Handler } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import DayAvailabilityRepository from '../../infrastructure/repos/DayAvailabilityRepository';

const ascWeekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

@Query()
export class GetDaysAvailabilityQuery {
  public userId: number;
}

@injectable()
@QueryHandler(GetDaysAvailabilityQuery)
class GetDaysAvailabilityQueryHandler implements Handler<GetDaysAvailabilityQuery, any> {
  @inject(DayAvailabilityRepository) private _dayAvailabilityRepository: DayAvailabilityRepository;

  async handle(query: GetDaysAvailabilityQuery) {
    console.log('USER_ID', query.userId);
    const result = await this._dayAvailabilityRepository.find({ user: { id: query.userId } });
    return result.sort(
      (a, b) => ascWeekDays.indexOf(a.day.toLowerCase()) - ascWeekDays.indexOf(b.day.toLowerCase()),
    );
  }
}

export default GetDaysAvailabilityQueryHandler;
