import {
  Controller,
  UseGuards,
  Logger,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ClassroomService } from './classroom.service';
import { Classroom } from './classroom.entity';
import { NewClassroomDto } from './classroom.dto';
import { async } from 'rxjs/internal/scheduler/async';

@ApiUseTags(`Classroom`)
@Controller(`classroom`)
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
export class ClassroomController {
  private readonly logger = new Logger(ClassroomController.name);
  constructor(private readonly classroomService: ClassroomService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of all classroom.`,
    type: Classroom,
    isArray: true,
  })
  getAll(): Promise<Classroom[]> {
    this.logger.log(`Get /`);
    return this.classroomService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `The classroom with the matching id`,
    type: Classroom,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Classroom> {
    this.logger.log(`Get /${id}`);
    return (await this.classroomService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: `The classroom has been created.`,
    type: Classroom,
  })
  saveNew(@Body() newClassroomDto: NewClassroomDto): Promise<Classroom> {
    this.logger.log(`Post /`);
    return this.classroomService.create(newClassroomDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: `The classroom has been updated.`,
    type: Classroom,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateClassroom(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() newClassroomDto: NewClassroomDto,
  ): Promise<Classroom> {
    this.logger.log(`Put /${id}`);
    return this.classroomService.update(id, newClassroomDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The classroom with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.logger.log(`Delete /${id}`);
    await this.classroomService.deleteById(id);
  }
}
