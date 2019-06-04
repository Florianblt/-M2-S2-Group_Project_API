import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Promo } from '../promo/promo.entity';
import { CourseStudent } from '../course-student/course-student.entity';

@Entity()
export class Course extends DbAuditModel {
  @Column({ length: 20, unique: true })
  @ApiModelProperty({ required: true })
  name: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => Classroom, classroom => classroom.courses)
  classroom: Classroom;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.courses)
  teacher: User;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => Promo, promo => promo.courses)
  promo: Promo;

  @Column()
  @ApiModelProperty({ required: true })
  hourBeginning: Date;

  @Column()
  @ApiModelProperty({ required: true })
  hourEnding: Date;

  @Column()
  @ApiModelProperty()
  clockInBeginning: Date;

  @Column()
  @ApiModelProperty()
  clockInEnding: Date;

  @ApiModelProperty()
  @OneToMany(type => CourseStudent, courseStudent => courseStudent.course)
  courseStudents: CourseStudent[];
}
