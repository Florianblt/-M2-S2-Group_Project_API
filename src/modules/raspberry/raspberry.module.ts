import { Module, forwardRef } from '@nestjs/common';
import { RaspberryService } from './raspberry.service';
import { RaspberryController } from './raspberry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raspberry } from './raspberry.entity';
import { RaspberryRepository } from './raspberry.repository';
import { ClassroomModule } from '../classroom/classroom.module';

@Module({
  providers: [RaspberryService],
  controllers: [RaspberryController],
  imports: [
    TypeOrmModule.forFeature([Raspberry, RaspberryRepository]),
    forwardRef(() => ClassroomModule),
  ],
  exports: [RaspberryService],
})
export class RaspberryModule {}
