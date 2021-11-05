---
to: src/modules/<%= module %>/application/commands/<%= h.changeCase.pascal(name) %>Command.ts
---
import { Handler, CommandHandler, Command } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Command()
export class <%= h.changeCase.pascal(name) %>Command {}

@injectable()
@CommandHandler(<%= h.changeCase.pascal(name) %>Command)
class <%= h.changeCase.pascal(name) %>CommandHandler implements Handler<<%= h.changeCase.pascal(name) %>Command, any> {
  async handle(command: <%= h.changeCase.pascal(name) %>Command) {
    return {};
  }
}

export default <%= h.changeCase.pascal(name) %>CommandHandler;
