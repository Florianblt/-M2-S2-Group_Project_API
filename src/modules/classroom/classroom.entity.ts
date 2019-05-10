import { Entity, Column } from 'typeorm';
import { DbAuditModel } from 'src/utils/dbmodel.model';
import { ApiModelProperty } from '@nestjs/swagger';

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
}
