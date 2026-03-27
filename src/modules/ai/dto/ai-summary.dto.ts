import { IsOptional, IsString, IsEnum, Allow } from 'class-validator';
import { Fuente } from '@prisma/client';

export class AiSummaryDto {
  @Allow()
  @IsOptional()
  @IsEnum(Fuente)
  fuente?: Fuente;

  @Allow()
  @IsOptional()
  @IsString()
  startDate?: string;

  @Allow()
  @IsOptional()
  @IsString()
  endDate?: string;
}
