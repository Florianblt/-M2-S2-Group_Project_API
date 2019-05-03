import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './modules/core/config/config.module';

@Module({
  imports: [
    // TODO Change .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      // tslint:disable-next-line:radix
      port: 5432,
      username: 'typeormtest',
      password: 'password',
      database: 'typeormtest',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
