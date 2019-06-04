import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { PromoModule } from '../promo/promo.module';
import { UsersModule } from '../users/users.module';
import { ClassroomModule } from '../classroom/classroom.module';
import { CourseStudentModule } from '../course-student/course-student.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course, CourseRepository]),
    forwardRef(() => PromoModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => CourseStudentModule),
  ],
})
export class CourseModule {}
