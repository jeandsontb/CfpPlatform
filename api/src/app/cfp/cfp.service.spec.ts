import { Test, TestingModule } from '@nestjs/testing';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

describe('CfpService', () => {
  let service: CfpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CfpService],
    }).compile();

    service = module.get<CfpService>(CfpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and store a speaker submission', () => {
    const dto: CreateSpeakerDto = {
      id: 'speaker-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      talkTitle: 'First Computer Program',
      isGDE: true,
    };

    const result = service.create(dto);
    expect(result).toEqual(dto);
    expect(service.findAll()).toContainEqual(dto);
  });
});
