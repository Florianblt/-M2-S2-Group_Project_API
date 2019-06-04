import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Classroom } from '../classroom/classroom.entity';

@Entity()
export class Course extends DbAuditModel {
  @Column({ length: 20, unique: true })
  @ApiModelProperty({ required: true })
  name: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => Classroom, classroom => classroom.courses)
  classroom: Classroom;

  @OneToMany(type => User, user => user.promo)
  students: User[];
}
