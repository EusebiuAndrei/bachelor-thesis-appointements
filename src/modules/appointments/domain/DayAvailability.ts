import 'reflect-metadata';
import User from '../../users/domain/User';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

class DayAvailability {
  id: number;
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
  user: User;
}

export default DayAvailability;
