import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event', () => {
    const dto: CreateEventDto = {
      name: 'NestJS Summit',
      address: 'Rua Augusta, 500',
      capacity: 200,
      date: '2025-11-20',
    };

    const result = controller.create(dto);
    expect(result.name).toBe('NestJS Summit');
    expect(result.id).toBeDefined();
    expect(controller.findAll().length).toBe(1);
  });
});
