---
to: src/modules/<%= h.inflection.pluralize(name) %>/application/queries/Get<%= h.changeCase.pascal(name) %>Query.ts
---
import { Handler, QueryHandler, Query } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Query()
export class Get<%= h.changeCase.pascal(name) %>Query {}

@injectable()
@QueryHandler(Get<%= h.changeCase.pascal(name) %>Query)
class Get<%= h.changeCase.pascal(name) %>QueryHandler implements Handler<Get<%= h.changeCase.pascal(name) %>Query, any> {
  async handle(query: Get<%= h.changeCase.pascal(name) %>Query) {
    return {};
  }
}

export default Get<%= h.changeCase.pascal(name) %>QueryHandler;
