export class LoginRequestDto {
  email: string;
  password: string;
}

export class RegisterRequestDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roleId: number;
}
