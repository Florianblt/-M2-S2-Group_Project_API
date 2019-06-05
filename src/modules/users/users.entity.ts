import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ROLES } from './roles.constants';
import { Promo } from '../promo/promo.entity';
import { Course } from '../course/course.entity';
import { CourseStudent } from '../course-student/course-student.entity';

@Entity()
export class User extends DbAuditModel {
  @Column()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @Column()
  @ApiModelProperty()
  key: string;

  @Column()
  @ApiModelProperty()
  firstName: string;

  @Column()
  @ApiModelProperty()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.DEFAULT_USER,
    nullable: true,
  })
  role?: ROLES;

  @ManyToOne(type => Promo, promo => promo.students)
  @Exclude()
  promo: Promo;

  @OneToMany(type => Course, course => course.teacher)
  @Exclude()
  courses: Course[];

  @ApiModelProperty()
  @OneToMany(type => CourseStudent, courseStudent => courseStudent.course)
  courseStudents: CourseStudent[];
}
