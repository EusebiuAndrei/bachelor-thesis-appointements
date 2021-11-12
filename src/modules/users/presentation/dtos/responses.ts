import { UserDto } from './models';

export class AuthenticationResponseDto {
  user: UserDto;
  token: string;
}
