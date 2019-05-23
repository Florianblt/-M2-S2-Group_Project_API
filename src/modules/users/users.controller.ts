import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from './users.entity';
import { UserService } from './users.service';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {
  UserDtoRegister,
  UserDtoUpdateInfo,
  UserDtoUpdatePassword,
} from './users.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDtoSetRoles } from './users.dto';

@ApiUseTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Get a list of all User.',
    type: User,
    isArray: true,
  })
  getAll(): Promise<User[]> {
    this.logger.log(`Get /`);
    return this.userService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The User has been created.',
    type: User,
  })
  saveNew(@Body() userDto: UserDtoRegister): Promise<User> {
    this.logger.log(`Post /`);
    return this.userService.saveNew(userDto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    description: 'The User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    this.logger.log(`Get /${id}`);
    return (await this.userService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDtoUpdateInfo,
  ): Promise<User> {
    this.logger.log(`Put /${id}`);
    return this.userService.update(id, userDto);
  }

  @Put(':id/roles')
  @ApiResponse({
    status: 200,
    description: 'The updated User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async setRoles(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDtoSetRoles: UserDtoSetRoles,
  ) {
    this.logger.log(`Put /${id}/password`);
  }

  @Put(':id/password')
  @ApiResponse({
    status: 200,
    description: 'The updated User with the matching id',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOnePassword(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userDto: UserDtoUpdatePassword,
  ): Promise<User> {
    this.logger.log(`Put /${id}/password`);
    return this.userService.updatePassword(id, userDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The User with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.logger.log(`Delete /${id}`);
    await this.userService.deleteById(id);
  }
}
