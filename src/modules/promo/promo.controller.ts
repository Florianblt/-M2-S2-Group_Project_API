import {
  Controller,
  UseGuards,
  Logger,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PromoService } from './promo.service';
import { Promo } from './promo.entity';
import { NewPromoDto } from './promo.dto';

@ApiUseTags('Promo')
@Controller('promo')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class PromoController {
  private readonly logger = new Logger(PromoController.name);

  constructor(private readonly promoService: PromoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of all Promo.`,
    type: Promo,
    isArray: true,
  })
  getAll(): Promise<Promo[]> {
    this.logger.log(`Get /`);
    return this.promoService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: `The promo with the matching id`,
    type: Promo,
  })
  @ApiResponse({ status: 404, description: `Not found.` })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Promo> {
    this.logger.log(`Get /${id}`);
    return await this.promoService.getOneById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: `The promo has been created.`,
    type: Promo,
  })
  saveNew(@Body() newPromoDto: NewPromoDto): Promise<Promo> {
    this.logger.log('Post /');
    return this.promoService.create(newPromoDto);
  }

  @Post(':idPromo/addStudent/:idStudent')
  @ApiResponse({
    status: 201,
    description: `The student has been added.`,
    type: Promo,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addStudent(
    @Param('idPromo', new ParseIntPipe()) idPromo: number,
    @Param('idStudent', new ParseIntPipe()) idStudent: number,
  ): Promise<Promo> {
    this.logger.log(`Post ${idPromo}/addStudent/${idStudent}`);
    return this.promoService.addStudent(idStudent, idPromo);
  }

  @Post(':idPromo/removeStudent/:idStudent')
  @ApiResponse({
    status: 201,
    description: `The student has been removed.`,
    type: Promo,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async removeStudent(
    @Param('idPromo', new ParseIntPipe()) idPromo: number,
    @Param('idStudent', new ParseIntPipe()) idStudent: number,
  ): Promise<Promo> {
    this.logger.log(`Post ${idPromo}/removeStudent/${idStudent}`);
    return this.promoService.removeStudent(idStudent, idPromo);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The promo with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.logger.log(`Delete /${id}`);
    await this.promoService.deleteById(id);
  }
}
