---
to: src/modules/<%= h.inflection.pluralize(name) %>/presentation/controllers/<%= h.changeCase.pascal(name) %>Controller.ts
---
import { inject } from 'inversify';
import { Controller, Created, createEvent, Get, MemMediator, Ok, Post } from '@eusebiu_gagea/mem';
import { Get<%= h.changeCase.pascal(name) %>Query } from '../../application/queries/Get<%= h.changeCase.pascal(name) %>Query';
import { Create<%= h.changeCase.pascal(name) %>Command } from '../../application/commands/Create<%= h.changeCase.pascal(name) %>Command';

@Controller('<%= name %>')
class <%= h.changeCase.pascal(name) %>Controller {
  @inject(MemMediator) private _mediator: MemMediator;

  @Get()
  public async find<%= h.changeCase.pascal(h.inflection.pluralize(name)) %>() {
    const result = await this._mediator.send(createEvent(Get<%= h.changeCase.pascal(name) %>Query, {}));

    return new Ok(result);
  }

  @Post()
  public async create<%= h.changeCase.pascal(name) %>() {
    const result = await this._mediator.send(createEvent(Create<%= h.changeCase.pascal(name) %>Command, {}));

    return new Created(result);
  }
}

export default <%= h.changeCase.pascal(name) %>Controller;
