import { Injectable } from '@nestjs/common';
import { EventDTO } from '@cfp-platform/shared-types';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  private readonly events: EventDTO[] = [];

  create(dto: CreateEventDto): EventDTO {
    const event: EventDTO = {
      id: dto.id || Date.now().toString(),
      name: dto.name,
      address: dto.address,
      capacity: dto.capacity,
      date: dto.date,
    };
    this.events.push(event);
    return event;
  }

  findAll(): EventDTO[] {
    return [...this.events];
  }
}
