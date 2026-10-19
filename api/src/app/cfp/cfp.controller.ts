import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Controller('cfp')
export class CfpController {
  constructor(private readonly cfpService: CfpService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSpeakerDto): SpeakerDTO {
    return this.cfpService.create(dto);
  }
}
