import { DayAvailabilityDto } from './../../../appointments/presentation/dtos/models';

export class RoleDto {
  id: number;
  code: string;
  title: string;
}

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleDto;
  availabilitySchedule: DayAvailabilityDto[];
}
