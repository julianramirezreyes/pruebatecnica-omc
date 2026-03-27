import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadsRepository } from './leads.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, LeadsRepository, PrismaService],
  exports: [LeadsService],
})
export class LeadsModule {}
