import { LeadsRepository } from './leads.repository';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';
import { Lead, Prisma } from '@prisma/client';
export declare class LeadsService {
    private readonly leadsRepository;
    constructor(leadsRepository: LeadsRepository);
    create(dto: CreateLeadDto): Promise<Lead>;
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
    findById(id: string): Promise<Lead>;
    update(id: string, dto: UpdateLeadDto): Promise<Lead>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getStats(): Promise<{
        total: number;
        byFuente: {
            fuente: import(".prisma/client").$Enums.Fuente;
            count: number;
        }[];
        avgPresupuesto: number | Prisma.Decimal;
        last7Days: number;
    }>;
    getLeadsForAI(filters: {
        fuente?: string;
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
