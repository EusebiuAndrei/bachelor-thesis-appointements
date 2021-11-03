import { Controller, Created, Delete, Get, Ok, Patch, Post, Put } from '@eusebiu_gagea/mem';

@Controller
class OkOpController {
  @Get()
  public async findAll() {
    return new Ok({});
  }

  @Get('/:id')
  public async findById() {
    return new Ok({});
  }

  @Post()
  public async create() {
    return new Created({});
  }

  @Put('/:id')
  public async update() {
    return new Ok({});
  }

  @Patch('/:id')
  public async patch() {
    return new Ok({});
  }

  @Delete('/:id')
  public async delete() {
    return new Ok({});
  }
}
