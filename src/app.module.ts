import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './modules/core/config/config.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { RaspberryModule } from './modules/raspberry/raspberry.module';
import { RolesGuard } from './guards/roles.guard';
import { PromoModule } from './modules/promo/promo.module';
import { CourseModule } from './modules/course/course.module';
import { CourseStudentModule } from './modules/course-student/course-student.module';
import { RfidModule } from './modules/rfid/rfid.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      // tslint:disable-next-line:radix
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
    ClassroomModule,
    RaspberryModule,
    PromoModule,
    CourseModule,
    CourseStudentModule,
    RfidModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor, RolesGuard],
})
export class AppModule {}
