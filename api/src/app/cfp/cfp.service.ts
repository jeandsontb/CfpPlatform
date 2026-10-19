import { Injectable } from '@nestjs/common';
import { SpeakerDTO } from '@cfp-platform/shared-types';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Injectable()
export class CfpService {
  private readonly submissions: SpeakerDTO[] = [];

  create(dto: CreateSpeakerDto): SpeakerDTO {
    const submission: SpeakerDTO = {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      talkTitle: dto.talkTitle,
      isGDE: dto.isGDE,
    };
    this.submissions.push(submission);
    return submission;
  }

  findAll(): SpeakerDTO[] {
    return [...this.submissions];
  }
}
