import { Fuente } from '@prisma/client';
export declare class CreateLeadDto {
    nombre: string;
    email: string;
    telefono?: string;
    fuente: Fuente;
    producto_interes?: string;
    presupuesto?: number;
}
