import { Injectable } from '@nestjs/common';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Injectable()
export class CfpService {
  private readonly submissions: SpeakerDTO[] = [];

  create(dto: CreateSpeakerDto): SpeakerDTO {
    const submission: SpeakerDTO = {
      ...dto,
    };
    this.submissions.push(submission);
    return submission;
  }

  findAll(): SpeakerDTO[] {
    return [...this.submissions];
  }
}
