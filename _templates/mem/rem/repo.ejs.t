---
to: src/modules/<%= module %>/infrastructure/repos/<%= h.changeCase.pascal(name) %>Repository.ts
---
import { injectable } from 'inversify';
import { EntityRepository, Repository } from 'typeorm';
import <%= h.changeCase.pascal(name) %>Entity from '../../../shared/infra/db/typeorm/schemas/<%= h.changeCase.pascal(name) %>Entity';
import <%= h.changeCase.pascal(name) %> from '../../domain/<%= h.changeCase.pascal(name) %>';

@injectable()
@EntityRepository(<%= h.changeCase.pascal(name) %>Entity)
class <%= h.changeCase.pascal(name) %>Repository extends Repository<<%= h.changeCase.pascal(name) %>> {}

export default <%= h.changeCase.pascal(name) %>Repository;
