import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EmailCheckDto } from './dto/email-check.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post("/signup")
  async createU(@Body() c:CreateUserDto) {
    return await  this.authService.createU(c);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async loginU(@Req() r:RequestWithUser) {
  //async loginU(@Body() l:LoginUserDto) {
    const {user} = r
    //const user =  await this.authService.loginU(l);
    //const token = await this.authService.generateJwtAccessToken(user.id)
    const token = await this.authService.generateJwtAccessToken(user.id)
    console.log(r, token)
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() r:RequestWithUser) {
    return r.user
  }

  @Post('email/send')
  async emailverification(@Body("email") email:string) {
    return await this.authService.emailverification(email)
  }

  @Post('email/check')
  async emailcheck(@Body() emailcheck : EmailCheckDto) {
    return await this.authService.emailcheck(emailcheck)
  }


}
