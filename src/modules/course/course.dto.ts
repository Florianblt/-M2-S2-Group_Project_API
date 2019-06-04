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
  @ApiModelProperty({ required: true, example: '2019-06-14T13:00:00.238Z' })
  hourBeginning: Date;

  @IsDate()
  @ApiModelProperty({ required: true, example: '2019-06-14T16:00:00.238Z' })
  hourEnding: Date;
}
