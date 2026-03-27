import { Fuente } from '@prisma/client';
export declare class UpdateLeadDto {
    nombre?: string;
    email?: string;
    telefono?: string;
    fuente?: Fuente;
    producto_interes?: string;
    presupuesto?: number;
}
