import { Controller, Logger, Get, Param, ParseIntPipe } from '@nestjs/common';
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

  @Get('/course/:id')
  @ApiResponse({
    status: 200,
    description: `Get a list of all CourseStudent for the id's course`,
    type: CourseStudent,
    isArray: true,
  })
  getAllForCourse(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<CourseStudent[]> {
    this.logger.log(`Get /`);
    return this.courseStudentService.getAllByCourse(id);
  }
}
