import { DayOfWeek } from './../../../../models/DayAvailability';

class CreateDayAvailabilityDto {
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
}

export default CreateDayAvailabilityDto;
