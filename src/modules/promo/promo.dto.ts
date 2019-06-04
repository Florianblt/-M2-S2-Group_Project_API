import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewPromoDto {
  @IsString()
  @ApiModelProperty({ required: true })
  name: string;
}
