import { Fuente } from '@prisma/client';
export declare class QueryLeadsDto {
    page?: number;
    limit?: number;
    fuente?: Fuente;
    startDate?: string;
    endDate?: string;
}
