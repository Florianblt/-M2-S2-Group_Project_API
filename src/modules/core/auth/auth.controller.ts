import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LoginDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../../users/users.entity';
import { UserService } from '../../users/users.service';
import { UserDtoRegister } from '../../users/users.dto';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async signIn(@Body() userLogin: LoginDto): Promise<TokenDto> {
    this.logger.log(`Post /login`);
    const token = await this.authService.signIn(
      userLogin.email,
      userLogin.password,
    );
    return token;
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(@Body() userRegister: UserDtoRegister): Promise<User> {
    this.logger.log(`Post /register`);
    return this.userService.saveNew(userRegister);
  }

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getMe(@CurrentUser() loggedUser: User) {
    this.logger.log(`Get /me`);
    return loggedUser;
  }
}
