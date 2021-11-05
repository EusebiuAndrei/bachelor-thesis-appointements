---
to: src/modules/shared/infra/db/typeorm/schemas/<%= h.changeCase.pascal(name) %>Entity.ts
---
import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import <%= h.changeCase.pascal(name) %>Model from '../../../../../<%= module %>/domain/<%= h.changeCase.pascal(name) %>';

@Entity()
class <%= h.changeCase.pascal(name) %> implements <%= h.changeCase.pascal(name) %>Model {
  @PrimaryGeneratedColumn()
  id: number;
}

export default <%= h.changeCase.pascal(name) %>;
