import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Classroom } from '../classroom/classroom.entity';

@Entity()
export class Raspberry extends DbAuditModel {
  @Column()
  @ApiModelProperty({ required: true })
  uid: string;

  @Column()
  @ApiModelProperty({ required: true })
  alive: boolean;

  @ApiModelProperty({ required: true })
  @OneToOne(type => Classroom)
  @JoinColumn()
  classroom: Classroom;
}
