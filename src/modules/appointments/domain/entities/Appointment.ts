import AppointmentStatus from './AppointmentStatus';
import User from '../../../users/domain/entities/User';

class Appointment {
  id: number;
  startDate: Date;
  duration: number;
  description: string;
  status: AppointmentStatus;
  professor: User;
  student: User;
}

export default Appointment;
