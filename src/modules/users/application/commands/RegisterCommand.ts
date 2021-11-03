import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repos/UserRepository';
import User from '../../../../models/User';
import RegisterUserDto from '../dtos/RegisterUserDto';

@Command()
export class RegisterCommand {
  user: RegisterUserDto;
}

@injectable()
@CommandHandler(RegisterCommand)
class RegisterCommandHandler implements Handler<RegisterCommand, any> {
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: RegisterCommand) {
    const {
      user: { email, password },
    } = command;

    console.log('== COMMAND ==', command);

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 8);

    await this._userRepo.save(user);
    const token = jwt.sign({ id: user.id }, 'MY_SECRET', { expiresIn: 10000000 });

    return { user, token };
  }
}

export default RegisterCommandHandler;
