"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = new client_1.PrismaClient({
    log: ['query'],
});
const leads = [
    {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '+5491155550001',
        fuente: 'instagram',
        producto_interes: 'Curso de Marketing Digital',
        presupuesto: 199.99,
    },
    {
        nombre: 'María García',
        email: 'maria.garcia@example.com',
        telefono: '+5491155550002',
        fuente: 'facebook',
        producto_interes: 'Mentoría 1:1',
        presupuesto: 499.0,
    },
    {
        nombre: 'Carlos López',
        email: 'carlos.lopez@example.com',
        telefono: '+5491155550003',
        fuente: 'landing_page',
        producto_interes: 'E-book Marketing',
        presupuesto: 29.99,
    },
    {
        nombre: 'Ana Martínez',
        email: 'ana.martinez@example.com',
        fuente: 'referido',
        producto_interes: 'Curso de YouTube',
        presupuesto: 149.0,
    },
    {
        nombre: 'Pedro Sánchez',
        email: 'pedro.sanchez@example.com',
        telefono: '+5491155550005',
        fuente: 'instagram',
        producto_interes: 'Pack Creator',
        presupuesto: 299.0,
    },
    {
        nombre: 'Laura Rodríguez',
        email: 'laura.rodriguez@example.com',
        telefono: '+5491155550006',
        fuente: 'facebook',
        producto_interes: 'Mentoría Grupal',
        presupuesto: 199.0,
    },
    {
        nombre: 'Diego Fernández',
        email: 'diego.fernandez@example.com',
        fuente: 'landing_page',
        producto_interes: 'Curso de Copywriting',
        presupuesto: 79.99,
    },
    {
        nombre: 'Sofia Torres',
        email: 'sofia.torres@example.com',
        telefono: '+5491155550008',
        fuente: 'instagram',
        producto_interes: 'Diseño de Logos',
        presupuesto: 350.0,
    },
    {
        nombre: 'Martín González',
        email: 'martin.gonzalez@example.com',
        telefono: '+5491155550009',
        fuente: 'otro',
        producto_interes: 'Consultoría',
        presupuesto: 150.0,
    },
    {
        nombre: 'Isabella Ruiz',
        email: 'isabella.ruiz@example.com',
        fuente: 'referido',
        producto_interes: 'Curso de Instagram',
        presupuesto: 129.0,
    },
    {
        nombre: 'Alejandro Díaz',
        email: 'alejandro.diaz@example.com',
        telefono: '+5491155550011',
        fuente: 'instagram',
        producto_interes: 'Curso de TikTok',
        presupuesto: 179.0,
    },
    {
        nombre: 'Valentina Herrera',
        email: 'valentina.herrera@example.com',
        telefono: '+5491155550012',
        fuente: 'facebook',
        producto_interes: 'Pack Premium',
        presupuesto: 599.0,
    },
];
async function main() {
    console.log('Starting seed...');
    for (const lead of leads) {
        await prisma.lead.upsert({
            where: { email: lead.email },
            update: {},
            create: lead,
        });
    }
    console.log(`Seeded ${leads.length} leads`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map