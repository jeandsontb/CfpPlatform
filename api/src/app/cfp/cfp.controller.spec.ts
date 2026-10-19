import { BadRequestException, type ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

describe('CfpController and Validation', () => {
  let controller: CfpController;
  let service: CfpService;
  let validationPipe: ValidationPipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateSpeakerDto,
    data: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CfpController],
      providers: [CfpService],
    }).compile();

    controller = module.get<CfpController>(CfpController);
    service = module.get<CfpService>(CfpService);
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  });

  describe('controller.create', () => {
    it('should create and return speaker submission with valid data', () => {
      const dto: CreateSpeakerDto = {
        id: 'spk-123',
        name: 'Ana Dev',
        email: 'ana@example.com',
        talkTitle: 'Arquitetura NestJS e Next.js',
        isGDE: true,
      };

      const result = controller.create(dto);

      expect(result).toEqual(dto);
      expect(service.findAll()).toHaveLength(1);
      expect(service.findAll()[0]).toEqual(dto);
    });
  });

  describe('ValidationPipe with CreateSpeakerDto', () => {
    it('should transform and accept valid payload', async () => {
      const validPayload = {
        id: 'spk-456',
        name: 'Carlos Rocha',
        email: 'carlos@example.com',
        talkTitle: 'Microfrontends na prática',
        isGDE: false,
      };

      const result = await validationPipe.transform(validPayload, metadata);

      expect(result).toBeInstanceOf(CreateSpeakerDto);
      expect(result.name).toBe('Carlos Rocha');
      expect(result.email).toBe('carlos@example.com');
      expect(result.isGDE).toBe(false);
    });

    it('should throw BadRequestException (400) when email is invalid', async () => {
      const invalidPayload = {
        id: 'spk-456',
        name: 'Carlos Rocha',
        email: 'invalid-email-format',
        talkTitle: 'Microfrontends',
        isGDE: false,
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata)
      ).rejects.toThrow(BadRequestException);

      try {
        await validationPipe.transform(invalidPayload, metadata);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).getStatus()).toBe(400);
      }
    });

    it('should throw BadRequestException (400) when required fields are missing', async () => {
      const incompletePayload = {
        name: 'Carlos Rocha',
      };

      await expect(
        validationPipe.transform(incompletePayload, metadata)
      ).rejects.toThrow(BadRequestException);

      try {
        await validationPipe.transform(incompletePayload, metadata);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).getStatus()).toBe(400);
      }
    });

    it('should throw BadRequestException (400) when unexpected fields are present (forbidNonWhitelisted)', async () => {
      const payloadWithExtra = {
        id: 'spk-789',
        name: 'Marina Lima',
        email: 'marina@example.com',
        talkTitle: 'Web Performance',
        isGDE: false,
        extraProperty: 'not-allowed',
      };

      await expect(
        validationPipe.transform(payloadWithExtra, metadata)
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException (400) when field types are incorrect', async () => {
      const wrongTypePayload = {
        id: 12345, // should be string
        name: 'Marina Lima',
        email: 'marina@example.com',
        talkTitle: 'Web Performance',
        isGDE: 'yes', // should be boolean
      };

      await expect(
        validationPipe.transform(wrongTypePayload, metadata)
      ).rejects.toThrow(BadRequestException);
    });
  });
});
