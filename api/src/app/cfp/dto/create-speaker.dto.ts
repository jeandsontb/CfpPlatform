import { SpeakerDTO } from '@cfp-platform/shared-types';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSpeakerDto implements SpeakerDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  talkTitle: string;

  @IsBoolean()
  isGDE: boolean;
}
