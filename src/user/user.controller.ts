import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createU(@Body() createUserDto: CreateUserDto) {
    return this.userService.createU(createUserDto);
  }

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  async updateU(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateU(id, updateUserDto);
  }

  @Delete(':id')
  async deleteU(@Param('id') id: string) {
    return this.userService.deleteU(id);
  }
}
