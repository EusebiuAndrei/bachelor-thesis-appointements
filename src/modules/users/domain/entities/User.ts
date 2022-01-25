import DayAvailability from '../../../appointments/domain/entities/DayAvailability';
import Role from './Role';

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  availabilitySchedule: DayAvailability[];
}

export default User;
