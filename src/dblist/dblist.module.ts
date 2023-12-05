import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config/dist';

@Module({

    imports : [

        TypeOrmModule.forRootAsync({

            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (cfg : ConfigService) => ({

                type : 'postgres',
                host : cfg.get('POSTGRES_HOST'),
                port : cfg.get('POSTGRES_PORT'),
                username : cfg.get('POSTGRES_USER'),
                password : cfg.get('POSTGRES_PASSWORD'),
                database : cfg.get('POSTGRES_DB'), 
                
                entities : [__dirname + "/../**/*.entity{.ts,.js}"
            ],
                autoLoadEntities : true,
                synchronize : true,

            })

        })



    ]


})
export class DblistModule {}
