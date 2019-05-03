import { IsArray, IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ROLES } from './roles.constants';

export class UserDtoRegister {
  @ApiModelProperty({
    required: true,
    example: [ROLES.DEFAULT_USER, ROLES.ADMIN_USER],
  })
  @IsArray()
  @IsIn([ROLES.DEFAULT_USER, ROLES.ADMIN_USER], {
    each: true,
  })
  roles: string[];

  @IsEmail()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @IsString()
  @ApiModelProperty({ example: 'foo' })
  firstName: string;

  @IsString()
  @ApiModelProperty({ example: 'bar' })
  lastName: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  password: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UserDtoUpdateInfo {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UserDtoUpdatePassword {
  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  newPassword: string;

  @IsString()
  @MinLength(6)
  @ApiModelProperty({ example: 'azerty', minLength: 6 })
  newPasswordBis: string;
}
