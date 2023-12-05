import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthService } from 'src/auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [ConfigModule],
  providers: [EmailService],
  exports : [EmailService]
})
export class EmailModule {}
