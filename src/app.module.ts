import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { user } from './entity/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { CoinModule } from './coin/coin.module';
import { coin } from './entity/coin.entity';
import { EventGateway } from './coin/coin.gateway';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [user, coin],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'jibin200584@gmail.com',
          pass: process.env.MAIL_PW,
        },
      },
    }),
    CoinModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
