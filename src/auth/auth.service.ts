import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { TokenPayloadInterface } from 'src/interfaces/tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Inject } from '@nestjs/common';
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import { Cache } from 'cache-manager';
import { EmailCheckDto } from './dto/email-check.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService,
    private readonly emailService : EmailService,
    @Inject(CACHE_MANAGER) private cacheManager : Cache
  ) {}

  async createU(c:CreateUserDto) {
    return await this.userService.createU(c)
  }



  async loginU(l:LoginUserDto) {
    const user = await this.userService.findUserByEmail(l.email)
    const ispwMatched = user.checkPassword(l.password)
    if (! ispwMatched) throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
    return user
  }


  public generateJwtAccessToken(userId : string) {
    const payload : TokenPayloadInterface = {userId}
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    }
    )
  return token
  }

  async emailverification(email:string) {
    const code = this.generateOTP()
    await this.cacheManager.set(email, code)
    await this.emailService.sendMail({
      to : email,
      subject : 'vercode',
      text : `aaaaaa is ${code}`

    })
    console.log(email, code)
    return 'success'
  }


  async emailcheck(emailcheckdto : EmailCheckDto) {
    console.log(emailcheckdto)
    const savedcode = await this.cacheManager.get(emailcheckdto.email)
    //console.log(emailcheckdto.email, savedcode)
    //if ( savedcode != emailcheckdto.code) throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
    //await this.cacheManager.del(emailcheckdto.email)
    return true
  }


  generateOTP() {
    let OTP = '';
    for (let i=1; i<=6; i++) {
      OTP += Math.floor(Math.random()*10)
    }
    return OTP
  }


}
