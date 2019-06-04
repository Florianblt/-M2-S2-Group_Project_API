import { Entity, Column, OneToMany } from 'typeorm';
import { DbAuditModel } from '../../utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

@Entity()
export class Promo extends DbAuditModel {
  @Column({ length: 20, unique: true })
  @ApiModelProperty({ required: true })
  name: string;

  @OneToMany(type => User, user => user.promo)
  students: User[];
}
