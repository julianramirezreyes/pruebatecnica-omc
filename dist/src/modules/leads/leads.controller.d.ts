import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { QueryLeadsDto } from './dto/query-leads.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(dto: CreateLeadDto): Promise<{
        telefono: string | null;
        id: string;
        email: string;
        nombre: string;
        fuente: import(".prisma/client").$Enums.Fuente;
        producto_interes: string | null;
        presupuesto: import("@prisma/client/runtime/library").Decimal | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    findAll(query: QueryLeadsDto): Promise<{
        data: {
            telefono: string | null;
            id: string;
            email: string;
            nombre: string;
            fuente: import(".prisma/client").$Enums.Fuente;
            producto_interes: string | null;
            presupuesto: import("@prisma/client/runtime/library").Decimal | null;
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
    getStats(): Promise<{
        total: number;
        byFuente: {
            fuente: import(".prisma/client").$Enums.Fuente;
            count: number;
        }[];
        avgPresupuesto: number | import("@prisma/client/runtime/library").Decimal;
        last7Days: number;
    }>;
    findOne(id: string): Promise<{
        telefono: string | null;
        id: string;
        email: string;
        nombre: string;
        fuente: import(".prisma/client").$Enums.Fuente;
        producto_interes: string | null;
        presupuesto: import("@prisma/client/runtime/library").Decimal | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    update(id: string, dto: UpdateLeadDto): Promise<{
        telefono: string | null;
        id: string;
        email: string;
        nombre: string;
        fuente: import(".prisma/client").$Enums.Fuente;
        producto_interes: string | null;
        presupuesto: import("@prisma/client/runtime/library").Decimal | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
