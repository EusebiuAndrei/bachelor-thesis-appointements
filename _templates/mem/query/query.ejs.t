---
to: src/modules/<%= module %>/application/queries/<%= h.changeCase.pascal(name) %>Query.ts
---
import { Handler, QueryHandler, Query } from '@eusebiu_gagea/mem';
import { injectable } from 'inversify';

@Query()
export class <%= h.changeCase.pascal(name) %>Query {}

@injectable()
@QueryHandler(<%= h.changeCase.pascal(name) %>Query)
class <%= h.changeCase.pascal(name) %>QueryHandler implements Handler<<%= h.changeCase.pascal(name) %>Query, any> {
  async handle(query: <%= h.changeCase.pascal(name) %>Query) {
    return {};
  }
}

export default <%= h.changeCase.pascal(name) %>QueryHandler;
