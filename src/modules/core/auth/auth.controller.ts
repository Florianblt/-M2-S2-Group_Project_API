import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../../users/users.entity';
import { UserService } from '../../users/users.service';
import { UserDtoRegister } from '../../users/users.dto';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLES } from '../../users/roles.constants';
import { Roles } from 'src/decorators/roles.decorator';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async signIn(@Body() userLogin: LoginDto): Promise<TokenDto> {
    this.logger.log(`Post /login`);
    const token = await this.authService.signIn(
      userLogin.email,
      userLogin.password,
    );
    return token;
  }

  @Post('register')
  async registerUser(@Body() userRegister: UserDtoRegister): Promise<User> {
    this.logger.log(`Post /register`);
    return this.userService.saveNew(userRegister);
  }

  @Get('/find/:key')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'The User with the matching key',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOneByUID(@Param('key') key: string): Promise<User> {
    this.logger.log(`Get /${key}`);
    return (await this.userService.getOneWithKey(key)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMe(@CurrentUser() loggedUser: User) {
    this.logger.log(`Get /me`);
    return loggedUser;
  }

  @Get('admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ROLES.ADMIN_USER)
  async getMeAdmin(@CurrentUser() loggedUser: User) {
    this.logger.log(`Get /me admin`);
    return loggedUser;
  }

  @Get('teacher')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ROLES.TEACHER_USER)
  async getMeTeacher(@CurrentUser() loggedUser: User) {
    this.logger.log(`Get /me teacher`);
    return loggedUser;
  }

  @Get('student')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(ROLES.STUDENT_USER)
  async getMeStudent(@CurrentUser() loggedUser: User) {
    this.logger.log(`Get /me student`);
    return loggedUser;
  }
}
