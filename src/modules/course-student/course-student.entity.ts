import { Entity, Column, ManyToOne } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Course } from '../course/course.entity';
import { User } from '../users/users.entity';

@Entity()
export class CourseStudent extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @ManyToOne(type => Course, course => course.courseStudents)
  course: Course;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.courseStudents)
  student: User;

  @Column({ nullable: true })
  @ApiModelProperty()
  clockInHour: Date;
}
