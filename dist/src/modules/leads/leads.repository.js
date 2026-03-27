"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LeadsRepository = class LeadsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.lead.create({ data });
    }
    async findAll(query) {
        const { page = 1, limit = 10, fuente, startDate, endDate } = query;
        const skip = (page - 1) * limit;
        const where = {
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
    async findById(id) {
        return this.prisma.lead.findFirst({
            where: { id, deleted_at: null },
        });
    }
    async update(id, data) {
        return this.prisma.lead.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
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
    async findForAI(filters) {
        const where = {
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
};
exports.LeadsRepository = LeadsRepository;
exports.LeadsRepository = LeadsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsRepository);
//# sourceMappingURL=leads.repository.js.map