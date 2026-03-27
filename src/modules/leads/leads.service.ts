import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { LeadsRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';
import { Lead, Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    try {
      return await this.leadsRepository.create(dto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(query: QueryLeadsDto) {
    return this.leadsRepository.findAll(query);
  }

  async findById(id: string): Promise<Lead> {
    const lead = await this.leadsRepository.findById(id);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async update(id: string, dto: UpdateLeadDto): Promise<Lead> {
    await this.findById(id);
    try {
      return await this.leadsRepository.update(id, dto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findById(id);
    await this.leadsRepository.softDelete(id);
    return { message: 'Lead deleted successfully' };
  }

  async getStats() {
    return this.leadsRepository.getStats();
  }

  async getLeadsForAI(filters: {
    fuente?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.leadsRepository.findForAI(filters as any);
  }
}
