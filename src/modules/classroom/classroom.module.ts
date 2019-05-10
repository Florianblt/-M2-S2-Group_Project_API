import { Module } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomRepository } from './classroom.repository';

@Module({
  controllers: [ClassroomController],
  imports: [TypeOrmModule.forFeature([Classroom, ClassroomRepository])],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
