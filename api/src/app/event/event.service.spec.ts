import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and store an event', () => {
    const dto: CreateEventDto = {
      id: 'event-1',
      name: 'Tech Conference 2025',
      address: 'Av. Paulista, 1000',
      capacity: 300,
      date: '2025-10-15',
    };

    const created = service.create(dto);
    expect(created).toEqual({
      id: 'event-1',
      name: 'Tech Conference 2025',
      address: 'Av. Paulista, 1000',
      capacity: 300,
      date: '2025-10-15',
    });

    const allEvents = service.findAll();
    expect(allEvents.length).toBe(1);
    expect(allEvents[0]).toEqual(created);
  });
});
