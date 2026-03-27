import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Fuente } from '@prisma/client';

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEnum(Fuente)
  fuente?: Fuente;

  @IsOptional()
  @IsString()
  producto_interes?: string;

  @IsOptional()
  @IsNumber()
  presupuesto?: number;
}
