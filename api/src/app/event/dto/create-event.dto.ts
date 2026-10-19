import { EventDTO } from '@cfp-platform/shared-types';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateEventDto implements EventDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
