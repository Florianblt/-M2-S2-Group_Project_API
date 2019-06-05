import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RfidDto {
  @IsString()
  @ApiModelProperty({ required: true })
  raspberryUID: string;

  @IsString()
  @ApiModelProperty({ required: true })
  userKey: string;
}
