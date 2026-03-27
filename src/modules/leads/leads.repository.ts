import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Lead, Fuente, Prisma } from '@prisma/client';
import { QueryLeadsDto } from './dto/query-leads.dto';

@Injectable()
export class LeadsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.LeadCreateInput): Promise<Lead> {
    return this.prisma.lead.create({ data });
  }

  async findAll(query: QueryLeadsDto) {
    const { page = 1, limit = 10, fuente, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {
      deleted_at: null,
    };

    if (fuente) {
      where.fuente = fuente;
    }

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) {
        where.created_at.gte = new Date(startDate);
      }
      if (endDate) {
        where.created_at.lte = new Date(endDate);
      }
    }

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data: leads,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Lead | null> {
    return this.prisma.lead.findFirst({
      where: { id, deleted_at: null },
    });
  }

  async update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async getStats() {
    const total = await this.prisma.lead.count({
      where: { deleted_at: null },
    });

    const byFuente = await this.prisma.lead.groupBy({
      by: ['fuente'],
      where: { deleted_at: null },
      _count: { fuente: true },
    });

    const avgPresupuesto = await this.prisma.lead.aggregate({
      where: {
        deleted_at: null,
        presupuesto: { not: null },
      },
      _avg: { presupuesto: true },
    });

    const last7Days = await this.prisma.lead.count({
      where: {
        deleted_at: null,
        created_at: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    return {
      total,
      byFuente: byFuente.map((item) => ({
        fuente: item.fuente,
        count: item._count.fuente,
      })),
      avgPresupuesto: avgPresupuesto._avg.presupuesto || 0,
      last7Days,
    };
  }

  async findForAI(filters: {
    fuente?: Fuente;
    startDate?: string;
    endDate?: string;
  }) {
    const where: Prisma.LeadWhereInput = {
      deleted_at: null,
    };

    if (filters.fuente) {
      where.fuente = filters.fuente;
    }

    if (filters.startDate || filters.endDate) {
      where.created_at = {};
      if (filters.startDate) {
        where.created_at.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.created_at.lte = new Date(filters.endDate);
      }
    }

    return this.prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }
}
