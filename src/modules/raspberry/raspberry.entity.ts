import { Entity, Column, OneToOne, JoinColumn, Unique } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Classroom } from '../classroom/classroom.entity';

@Entity()
export class Raspberry extends DbAuditModel {
  @Column({ length: 20, unique: true })
  @ApiModelProperty({ required: true })
  uid: string;

  @Column()
  @ApiModelProperty({ required: true })
  alive: boolean;

  @ApiModelProperty({ required: true })
  @OneToOne(type => Classroom, { onDelete: 'CASCADE' })
  @JoinColumn()
  classroom: Classroom;
}
