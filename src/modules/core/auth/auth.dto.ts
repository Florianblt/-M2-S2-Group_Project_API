import { IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/users.entity';

export class TokenDto {
  token: string;
  me: User;
}

// tslint:disable-next-line:max-classes-per-file
export class LoginDto {
  @MinLength(1)
  @IsEmail()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @MinLength(1)
  @ApiModelProperty({ example: 'azerty' })
  password: string;
}
