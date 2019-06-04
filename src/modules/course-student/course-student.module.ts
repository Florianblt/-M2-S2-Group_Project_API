import { Module, forwardRef } from '@nestjs/common';
import { CourseStudentController } from './course-student.controller';
import { CourseStudentService } from './course-student.service';
import { CourseService } from '../course/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStudent } from './course-student.entity';
import { CourseStudentRepository } from './course-student.repository';
import { CourseModule } from '../course/course.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CourseStudentController],
  providers: [CourseStudentService],
  exports: [CourseStudentService],
  imports: [
    TypeOrmModule.forFeature([CourseStudent, CourseStudentRepository]),
    forwardRef(() => CourseModule),
    forwardRef(() => UsersModule),
  ],
})
export class CourseStudentModule {}
