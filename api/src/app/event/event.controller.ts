import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EventDTO } from '@cfp-platform/shared-types';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller(['event', 'events'])
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto): EventDTO {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(): EventDTO[] {
    return this.eventService.findAll();
  }
}
