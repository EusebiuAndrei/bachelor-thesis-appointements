---
to: src/modules/<%= module %>/presentation/controllers/<%= h.changeCase.pascal(name) %>Controller.ts
---
import { Controller, HttpCreated, Delete, Get, HttpOk, Patch, Post, Put } from '@eusebiu_gagea/mem';

@Controller('<%= name %>')
class <%= h.changeCase.pascal(name) %>Controller {
  @Get()
  public async findAll() {
    return HttpOk('All entries');
  }

  @Get('/:id')
  public async findById() {
    return HttpOk('Entry by id');
  }

  @Post()
  public async create() {
    return HttpCreated('Entry created');
  }

  @Put('/:id')
  public async update() {
    return HttpOk('Entry updated');
  }

  @Patch('/:id')
  public async patch() {
    return HttpOk('Entry patched');
  }

  @Delete('/:id')
  public async delete() {
    return HttpOk('Entry deleted');
  }
}

export default <%= h.changeCase.pascal(name) %>Controller;
