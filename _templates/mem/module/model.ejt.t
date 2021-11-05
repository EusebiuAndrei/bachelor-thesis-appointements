---
to: src/modules/<%= h.inflection.pluralize(name) %>/domain/<%= h.changeCase.pascal(name) %>.ts
---
class <%= h.changeCase.pascal(name) %> {
  id: number;
}

export default <%= h.changeCase.pascal(name) %>;
