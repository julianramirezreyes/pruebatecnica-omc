import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Fuente } from '@prisma/client';

export class AiSummaryDto {
  @IsOptional()
  @IsEnum(Fuente)
  fuente?: Fuente;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
