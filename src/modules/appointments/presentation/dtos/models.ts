import { UserDto } from './../../../users/presentation/dtos/models';
import { DayOfWeek } from './../../domain/DayAvailability';

export class AppointmentDto {
  id: number;
  startDate: Date;
  duration: number;
  description: string;
  status: AppointmentStatusDto;
  professor: UserDto;
  student: UserDto;
}

export class AppointmentStatusDto {
  id: number;
  code: string;
  title: string;
}

export class DayAvailabilityDto {
  id: number;
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
  user: UserDto;
}
