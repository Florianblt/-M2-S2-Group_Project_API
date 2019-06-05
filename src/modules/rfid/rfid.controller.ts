import { Controller, Logger, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { RfidService } from './rfid.service';
import { RfidDto } from './rfid.dto';

@ApiUseTags('Rfid')
@Controller('rfid')
export class RfidController {
  private readonly logger = new Logger(RfidController.name);

  constructor(private readonly rfidService: RfidService) {}

  @Post()
  @ApiResponse({
    status: 204,
    description: `The course has been successfully started`,
  })
  @ApiResponse({
    status: 204,
    description: `You have been correctly clocked in to this course`,
  })
  @ApiResponse({
    status: 400,
    description: `You are not assigned to a course in this room at this time`,
  })
  @ApiResponse({
    status: 404,
    description: `Not found`,
  })
  async submitRfid(@Body() rfidDto: RfidDto) {
    this.logger.log(`Post /`);
    return await this.rfidService.submitRfid(rfidDto);
  }
}
