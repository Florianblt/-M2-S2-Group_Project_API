import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from './roles.entity';

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

  @ManyToMany(type => Role, role => role.user, { nullable: true })
  @JoinTable()
  roles: Role[];
}
