import DayAvailability, { DayOfWeek } from '../../domain/DayAvailability';
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import UserRepository from '../../../users/infrastructure/repos/UserRepository';
import DayAvailabilityRepository from '../../infrastructure/repos/DayAvailabilityRepository';
import UserService from '../../../users/domain/services/UserService';

@Command()
export class UpsertDayAvailabilityCommand {
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
  userId: number;
}

@injectable()
@CommandHandler(UpsertDayAvailabilityCommand)
class UpsertDayAvailabilityCommandHandler implements Handler<UpsertDayAvailabilityCommand, any> {
  @inject(DayAvailabilityRepository) private _dayAvailabilityRepo: DayAvailabilityRepository;
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: UpsertDayAvailabilityCommand) {
    const user = await this._userRepo.findOne(command.userId, { relations: ['role'] });
    const existingDayAvailability = await this._dayAvailabilityRepo.findOne({ day: command.day });

    UserService(user).checkProfessor();

    const dayAvailability = existingDayAvailability
      ? existingDayAvailability
      : new DayAvailability();
    dayAvailability.day = command.day;
    dayAvailability.hours = command.hours;
    dayAvailability.minutes = command.minutes;
    dayAvailability.duration = command.duration;
    dayAvailability.user = user;

    await this._dayAvailabilityRepo.save(dayAvailability);

    return true;
  }
}

export default UpsertDayAvailabilityCommandHandler;
