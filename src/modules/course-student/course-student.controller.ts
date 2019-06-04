import { Controller, Logger, Get } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { CourseStudentService } from './course-student.service';
import { CourseStudent } from './course-student.entity';

@ApiUseTags('Course-student')
@Controller('course-student')
export class CourseStudentController {
  private readonly logger = new Logger(CourseStudentController.name);

  constructor(private readonly courseStudentService: CourseStudentService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of all CourseStudent.`,
    type: CourseStudent,
    isArray: true,
  })
  getAll(): Promise<CourseStudent[]> {
    this.logger.log(`Get /`);
    return this.courseStudentService.getAll();
  }
}
