import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repos/UserRepository';

@Command()
export class LoginCommand {
  email: string;
  password: string;
}

@injectable()
@CommandHandler(LoginCommand)
class LoginCommandHandler implements Handler<LoginCommand, any> {
  @inject(UserRepository) private _userRepo: UserRepository;

  async handle(command: LoginCommand) {
    const { email, password } = command;
    const user = await this._userRepo.findOne({ email });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ id: user.id }, 'MY_SECRET', { expiresIn: 10000000 });

    return { user, token };
  }
}

export default LoginCommandHandler;
