import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from './users.entity';
import { DbAuditModel } from '../../utils/dbmodel.model';

@Entity()
export class Role extends DbAuditModel {
  @Column({ unique: true })
  key: string;

  @ManyToMany(type => User, user => user.roles, { nullable: true })
  user: User[];
}
