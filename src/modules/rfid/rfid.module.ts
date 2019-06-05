import { Module, forwardRef } from '@nestjs/common';
import { RfidController } from './rfid.controller';
import { RfidService } from './rfid.service';
import { CourseModule } from '../course/course.module';
import { UsersModule } from '../users/users.module';
import { CourseStudentModule } from '../course-student/course-student.module';

@Module({
  controllers: [RfidController],
  providers: [RfidService],
  imports: [
    forwardRef(() => CourseModule),
    forwardRef(() => UsersModule),
    forwardRef(() => CourseStudentModule),
  ],
})
export class RfidModule {}
