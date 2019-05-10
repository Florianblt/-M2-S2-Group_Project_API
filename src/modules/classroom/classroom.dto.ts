import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NewClassroomDto {
  @IsString()
  @ApiModelProperty({ required: true })
  name: string;

  @IsString()
  @ApiModelProperty({ required: true })
  batiment: string;

  @IsString()
  @ApiModelProperty({ required: true })
  adresse: string;
}
