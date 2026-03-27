import { PrismaService } from '../../prisma/prisma.service';
import { Lead, Fuente, Prisma } from '@prisma/client';
import { QueryLeadsDto } from './dto/query-leads.dto';
export declare class LeadsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.LeadCreateInput): Promise<Lead>;
    findAll(query: QueryLeadsDto): Promise<{
        data: {
            telefono: string | null;
            id: string;
            email: string;
            nombre: string;
            fuente: import(".prisma/client").$Enums.Fuente;
            producto_interes: string | null;
            presupuesto: Prisma.Decimal | null;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<Lead | null>;
    update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead>;
    softDelete(id: string): Promise<Lead>;
    getStats(): Promise<{
        total: number;
        byFuente: {
            fuente: import(".prisma/client").$Enums.Fuente;
            count: number;
        }[];
        avgPresupuesto: number | Prisma.Decimal;
        last7Days: number;
    }>;
    findForAI(filters: {
        fuente?: Fuente;
        startDate?: string;
        endDate?: string;
    }): Promise<{
        telefono: string | null;
        id: string;
        email: string;
        nombre: string;
        fuente: import(".prisma/client").$Enums.Fuente;
        producto_interes: string | null;
        presupuesto: Prisma.Decimal | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }[]>;
}
