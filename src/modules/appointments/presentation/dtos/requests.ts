import { DayOfWeek } from '../../domain/DayAvailability';

export class CreateDayAvailabilityRequestDto {
  day: DayOfWeek;
  hours: number;
  minutes: number;
  duration: number;
}

export class ProposeAppointmentRequestDto {
  startDate: Date;
  duration: number;
  description: string;
  professorId: number;
}
