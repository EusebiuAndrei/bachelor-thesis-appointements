---
to: src/modules/<%= h.inflection.pluralize(name) %>/application/commands/Create<%= h.changeCase.pascal(name) %>Command.ts
---
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Command()
export class Create<%= h.changeCase.pascal(name) %>Command {}

@injectable()
@CommandHandler(Create<%= h.changeCase.pascal(name) %>Command)
class Create<%= h.changeCase.pascal(name) %>CommandHandler implements Handler<Create<%= h.changeCase.pascal(name) %>Command, any> {
  async handle(command: Create<%= h.changeCase.pascal(name) %>Command) {
    return {};
  }
}

export default Create<%= h.changeCase.pascal(name) %>CommandHandler;
