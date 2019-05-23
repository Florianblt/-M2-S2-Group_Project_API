import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { DbAuditModel } from 'src/utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Raspberry } from '../raspberry/raspberry.entity';

@Entity()
export class Classroom extends DbAuditModel {
  @Column()
  @ApiModelProperty()
  name: string;

  @Column()
  @ApiModelProperty()
  batiment: string;

  @Column()
  @ApiModelProperty()
  adresse: string;

  @ApiModelProperty({ required: true })
  @OneToOne(type => Raspberry, { onDelete: 'CASCADE' })
  @JoinColumn()
  raspberry: Raspberry;
}
