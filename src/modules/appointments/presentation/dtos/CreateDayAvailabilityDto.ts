import { DayOfWeek } from '../../domain/DayAvailability';

class CreateDayAvailabilityDto {
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
}

export default CreateDayAvailabilityDto;
