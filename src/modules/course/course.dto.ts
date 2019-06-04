import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NewCourseDto {
  @IsString()
  @ApiModelProperty({ required: true })
  name: string;

  @IsNumber()
  @ApiModelProperty({ required: true })
  idClassroom: number;

  @IsNumber()
  @ApiModelProperty({ required: true })
  idTeacher: number;

  @IsNumber()
  @ApiModelProperty({ required: true })
  idPromo: number;

  @IsDate()
  @ApiModelProperty({ required: true })
  hourBeginning: Date;

  @IsDate()
  @ApiModelProperty({ required: true })
  hourEnding: Date;
}
