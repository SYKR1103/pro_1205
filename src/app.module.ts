import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DblistModule } from './dblist/dblist.module';
import { ConfigModule } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import * as Joi from'@hapi/joi'
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AppConfigModule, DblistModule, UserModule, AuthModule, RedisModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
