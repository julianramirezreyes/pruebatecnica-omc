import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Fuente } from '@prisma/client';

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsEnum(Fuente)
  fuente: Fuente;

  @IsOptional()
  @IsString()
  producto_interes?: string;

  @IsOptional()
  @IsNumber()
  presupuesto?: number;
}
