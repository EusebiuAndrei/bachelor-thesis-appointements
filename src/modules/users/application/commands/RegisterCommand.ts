import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repos/UserRepository';
import User from '../../domain/entities/User';
import RegisterUserDto from '../dtos/RegisterUserDto';
import RoleRepository from '../../infrastructure/repos/RoleRepository';

@Command()
export class RegisterCommand {
  user: RegisterUserDto;
}

@injectable()
@CommandHandler(RegisterCommand)
class RegisterCommandHandler implements Handler<RegisterCommand, any> {
  @inject(UserRepository) private _userRepo: UserRepository;
  @inject(RoleRepository) private _roleRepo: RoleRepository;

  async handle(command: RegisterCommand) {
    const {
      user: { email, password, firstName, lastName, roleId },
    } = command;

    // =========== Belongs to repository ===========
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 8);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    user.role = await this._roleRepo.findOne(roleId);
    // =============================================

    await this._userRepo.save(user);
    const token = jwt.sign({ id: user.id }, 'MY_SECRET', { expiresIn: 10000000 });

    return { user, token };
  }
}

export default RegisterCommandHandler;
