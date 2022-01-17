import DayAvailability, { DayOfWeek } from '../../domain/entities/DayAvailability';
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import UserRepository from '../../../users/infrastructure/repos/UserRepository';
import DayAvailabilityRepository from '../../infrastructure/repos/DayAvailabilityRepository';
import UserService from '../../../users/domain/services/UserService';

@Command()
export class CreateDayAvailabilityCommand {
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
  userId: number;
}

@injectable()
@CommandHandler(CreateDayAvailabilityCommand)
class CreateDayAvailabilityCommandHandler implements Handler<CreateDayAvailabilityCommand, any> {
  @inject(DayAvailabilityRepository) private _dayAvailabilityRepo: DayAvailabilityRepository;
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: CreateDayAvailabilityCommand) {
    const user = await this._userRepo.findOne(command.userId, { relations: ['role'] });
    console.log(user);
    UserService(user).checkProfessor();

    const dayAvailability = new DayAvailability();
    dayAvailability.day = command.day;
    dayAvailability.hours = command.hours;
    dayAvailability.minutes = command.minutes;
    dayAvailability.duration = command.duration;
    dayAvailability.user = user;

    await this._dayAvailabilityRepo.save(dayAvailability);

    return dayAvailability;
  }
}

export default CreateDayAvailabilityCommandHandler;
