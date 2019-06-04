import { DbAuditModel } from '../../utils/dbmodel.model';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ROLES } from './roles.constants';
import { Promo } from '../promo/promo.entity';
import { Course } from '../course/course.entity';

@Entity()
export class User extends DbAuditModel {
  @Column()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

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
}
