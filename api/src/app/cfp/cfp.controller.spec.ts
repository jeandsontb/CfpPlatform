import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CfpController } from './cfp.controller';
import { CfpService } from './cfp.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

describe('CfpController', () => {
  let controller: CfpController;
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
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create (POST)', () => {
    it('should call service.create and return created speaker proposal', () => {
      const dto: CreateSpeakerDto = {
        id: 'speaker-1',
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        talkTitle: 'First Computer Program',
        isGDE: true,
      };

      const result = controller.create(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('ValidationPipe with CreateSpeakerDto', () => {
    const validPayload = {
      id: 'speaker-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      talkTitle: 'First Computer Program',
      isGDE: true,
    };

    it('should accept a completely valid payload', async () => {
      const transformed = await validationPipe.transform(validPayload, metadata);
      expect(transformed).toBeInstanceOf(CreateSpeakerDto);
      expect(transformed).toEqual(validPayload);
    });

    it('should throw 400 Bad Request when required fields are missing', async () => {
      const invalidPayload = {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata)
      ).rejects.toThrow(BadRequestException);

      try {
        await validationPipe.transform(invalidPayload, metadata);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        const response = (error as BadRequestException).getResponse() as {
          message: string[];
          statusCode: number;
        };
        expect(response.statusCode).toBe(400);
        expect(response.message).toEqual(
          expect.arrayContaining([
            expect.stringContaining('id'),
            expect.stringContaining('talkTitle'),
            expect.stringContaining('isGDE'),
          ])
        );
      }
    });

    it('should throw 400 Bad Request when email format is invalid', async () => {
      const invalidPayload = {
        ...validPayload,
        email: 'not-an-email',
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata)
      ).rejects.toThrow(BadRequestException);

      try {
        await validationPipe.transform(invalidPayload, metadata);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        const response = (error as BadRequestException).getResponse() as {
          message: string[];
          statusCode: number;
        };
        expect(response.statusCode).toBe(400);
        expect(response.message).toEqual(
          expect.arrayContaining([expect.stringContaining('email must be an email')])
        );
      }
    });

    it('should throw 400 Bad Request when property types are incorrect', async () => {
      const invalidPayload = {
        ...validPayload,
        isGDE: 'not-a-boolean',
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata)
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw 400 Bad Request when non-whitelisted properties are present', async () => {
      const invalidPayload = {
        ...validPayload,
        extraProperty: 'malicious-data',
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata)
      ).rejects.toThrow(BadRequestException);

      try {
        await validationPipe.transform(invalidPayload, metadata);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        const response = (error as BadRequestException).getResponse() as {
          message: string[];
          statusCode: number;
        };
        expect(response.statusCode).toBe(400);
        expect(response.message).toEqual(
          expect.arrayContaining([
            expect.stringContaining('property extraProperty should not exist'),
          ])
        );
      }
    });
  });
});
