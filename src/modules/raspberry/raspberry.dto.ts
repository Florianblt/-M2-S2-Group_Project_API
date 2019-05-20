import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class NewRaspberryDto {
  @IsString()
  @ApiModelProperty({ required: true })
  uid: string;

  @IsNumber()
  @ApiModelProperty({ required: true })
  idClassroom: number;
}
