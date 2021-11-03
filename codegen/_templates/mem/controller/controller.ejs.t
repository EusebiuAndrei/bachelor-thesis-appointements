---
to: app/controllers/<%= h.changeCase.pascal(name) %>Controller.ts
---
import { Controller, Created, Delete, Get, Ok, Patch, Post, Put } from '@eusebiu_gagea/mem';

@Controller
class <%= h.changeCase.pascal(name) %>Controller {
  @Get()
  public async findAll() {
    return new Ok('All entries');
  }

  @Get('/:id')
  public async findById() {
    return new Ok('Entry by id');
  }

  @Post()
  public async create() {
    return new Created('Entry created');
  }

  @Put('/:id')
  public async update() {
    return new Ok('Entry updated');
  }

  @Patch('/:id')
  public async patch() {
    return new Ok('Entry patched');
  }

  @Delete('/:id')
  public async delete() {
    return new Ok('Entry deleted');
  }
}

