import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Command()
export class CreateHelloCommand {}

@injectable()
@CommandHandler(CreateHelloCommand)
class CreateHelloCommandHandler implements Handler<CreateHelloCommand, any> {
  async handle(command: CreateHelloCommand) {
    return {};
  }
}

export default CreateHelloCommandHandler;
