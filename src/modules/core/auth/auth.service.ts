import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './auth.dto';
import { Optional } from 'typescript-optional';
import { User } from 'src/modules/users/users.entity';

export interface JwtPayload {
  idUser: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<TokenDto> {
    const userFound = (await this.usersService.getOnWithEmail(
      email,
    )).orElseThrow(() => new UnauthorizedException());
    if (!this.usersService.doPasswordMatch(userFound, password)) {
      throw new UnauthorizedException();
    }
    const user: JwtPayload = { idUser: userFound.id };
    const tokenDto: TokenDto = new TokenDto();
    tokenDto.me = userFound;
    tokenDto.token = this.jwtService.sign(user);
    return tokenDto;
  }

  async validateUser(payload: JwtPayload): Promise<Optional<User>> {
    return await this.usersService.getOneById(payload.idUser);
  }
}
