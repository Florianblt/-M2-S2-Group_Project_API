import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { NewCourseDto } from './course.dto';
import { start } from 'repl';

@Controller('course')
@ApiUseTags('Course')
export class CourseController {
  private readonly logger = new Logger(CourseController.name);

  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of all Course.`,
    type: Course,
    isArray: true,
  })
  getAll(): Promise<Course[]> {
    this.logger.log(`Get /`);
    return this.courseService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `The course with the matching id`,
    type: Course,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Course> {
    this.logger.log(`Get /${id}`);
    return await this.courseService.getOneById(id);
  }

  @Get('classroom/:id')
  @ApiResponse({
    status: 200,
    description: `The actual course with the matching classroom`,
    type: Course,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  async findActualCourseofClassroom(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Course> {
    this.logger.log(`Get /classroom/${id}`);
    return await this.courseService.getActualCourseByClassroom(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: `The course has been created.`,
    type: Course,
  })
  saveNew(@Body() newCourseDto: NewCourseDto): Promise<Course> {
    this.logger.log('Post /');
    return this.courseService.create(newCourseDto);
  }

  @Post(':id/start')
  @ApiResponse({
    status: 200,
    description: `The course ClockIn has been started`,
    type: Course,
  })
  async start(@Param('id', new ParseIntPipe()) id: number): Promise<Course> {
    this.logger.log(`Post /${id}/start`);
    return this.courseService.startCourse(id);
  }
}
