import { Module, forwardRef } from '@nestjs/common';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { ClassroomRepository } from './classroom.repository';
import { RaspberryModule } from '../raspberry/raspberry.module';

@Module({
  controllers: [ClassroomController],
  imports: [
    TypeOrmModule.forFeature([Classroom, ClassroomRepository]),
    forwardRef(() => RaspberryModule),
  ],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
