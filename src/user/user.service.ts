import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}


  async createU(createUserDto: CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    if (newuser) return newuser
  }

  async findAll() {
    return await this.userRepo.find()
  }

  async findUserById(id: string) {
    const founduser = await this.userRepo.findOneBy({id})
    if (!founduser) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
    return founduser
  }

  async findUserByEmail(email: string) {
    const founduser = await this.userRepo.findOneBy({email})
    if (!founduser) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
    return founduser
  }

  async updateU(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto)
    const updateduser = await this.userRepo.findOneBy({id})
    if (!updateduser) throw new HttpException('xxxx', HttpStatus.NOT_FOUND)
    return updateduser
  }

  async deleteU(id: string) {
    const deleteresponse = await this.userRepo.delete(id)
    if (!deleteresponse.affected) throw new HttpException('xxxxx', HttpStatus.BAD_REQUEST)
    return "deleted"
  }
}
