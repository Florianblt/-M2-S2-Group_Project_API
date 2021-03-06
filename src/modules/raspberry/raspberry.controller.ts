import {
  Controller,
  Logger,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RaspberryService } from './raspberry.service';
import { Raspberry } from './raspberry.entity';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { NewRaspberryDto } from './raspberry.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags(`Raspberry`)
@Controller('raspberry')
export class RaspberryController {
  private readonly logger = new Logger(RaspberryController.name);

  constructor(private readonly raspberryService: RaspberryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of all Raspberry.`,
    type: Raspberry,
    isArray: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getAll(): Promise<Raspberry[]> {
    this.logger.log(`Get /`);
    return this.raspberryService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `The raspberry with the matching id`,
    type: Raspberry,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Raspberry> {
    this.logger.log(`Get /${id}`);
    return await this.raspberryService.getOneById(id);
  }

  @Get('/me/:uid')
  @ApiResponse({
    status: 200,
    description: `The raspberry with the matching uid`,
    type: Raspberry,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  async findMe(@Param('uid') uid: string): Promise<Raspberry> {
    return await this.raspberryService.getOneByUID(uid);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: `The raspberry has been created.`,
    type: Raspberry,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  saveNew(@Body() newRaspberryDto: NewRaspberryDto): Promise<Raspberry> {
    this.logger.log(`Post /`);
    return this.raspberryService.create(newRaspberryDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: `The raspberry has been updated.`,
    type: Raspberry,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateRaspberry(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() newRaspberryDto: NewRaspberryDto,
  ): Promise<Raspberry> {
    this.logger.log(`Put /${id}`);
    return this.raspberryService.update(id, newRaspberryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The raspberry with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.logger.log(`Delete /${id}`);
    await this.raspberryService.deleteById(id);
  }
}
