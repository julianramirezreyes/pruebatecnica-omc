# One Million Copy - Backend API

API REST para gestión de leads con integración de IA.

## Stack Tecnológico

| Tecnología              | Porqué                                                                     |
| ----------------------- | -------------------------------------------------------------------------- |
| **NestJS**              | Arquitectura limpia, inyección de dependencias, modularidad out-of-the-box |
| **Prisma + PostgreSQL** | Tipado fuerte, migraciones automáticas, queries type-safe                  |
| **TypeScript**          | Seguridad en tipos, mejor DX                                               |

## Decisiones Técnicas

- **Soft delete**: Se usa `deleted_at` en lugar de boolean para mantener integridad de datos
- **AI desacoplado**: Provider pattern permite cambiar entre Mock y OpenAI sin modificar lógica de negocio
- **Sin autenticación**: No es requerida por la especificación y suma complejidad innecesaria bajo restricción de tiempo

## Setup

### Requisitos

- Node.js 18+
- PostgreSQL 14+

### Instalación

```bash
npm install
```

### Variables de entorno

Copiar `.env.example` a `.env` y configurar:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/one_million_copy?schema=public"
PORT=3000

# AI (opcional)
AI_PROVIDER=mock
OPENAI_API_KEY=sk-...
```

### Migraciones y Seed

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Poblar con datos de ejemplo (12 leads)
npm run prisma:seed
```

## Endpoints

### POST /leads

Crear un nuevo lead.

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "telefono": "+5491155550001",
    "fuente": "instagram",
    "producto_interes": "Curso de Marketing",
    "presupuesto": 199.99
  }'
```

### GET /leads

Listar leads con paginación y filtros.

```bash
# Todos los leads
curl http://localhost:3000/leads

# Con paginación
curl "http://localhost:3000/leads?page=1&limit=10"

# Filtrar por fuente
curl "http://localhost:3000/leads?fuente=instagram"

# Filtrar por rango de fecha
curl "http://localhost:3000/leads?startDate=2024-01-01&endDate=2024-12-31"
```

### GET /leads/:id

Obtener un lead por ID.

```bash
curl http://localhost:3000/leads/{id}
```

### PATCH /leads/:id

Actualizar un lead.

```bash
curl -X PATCH http://localhost:3000/leads/{id} \
  -H "Content-Type: application/json" \
  -d '{"presupuesto": 299.99}'
```

### DELETE /leads/:id

Eliminar un lead (soft delete).

```bash
curl -X DELETE http://localhost:3000/leads/{id}
```

### GET /leads/stats

Estadísticas de leads.

```bash
curl http://localhost:3000/leads/stats
```

Respuesta:

```json
{
  "total": 12,
  "byFuente": [
    { "fuente": "instagram", "count": 4 },
    { "fuente": "facebook", "count": 3 },
    ...
  ],
  "avgPresupuesto": 217.75,
  "last7Days": 12
}
```

### POST /leads/ai/summary

Generar resumen con IA (mock o OpenAI).

```bash
# Resumen de todos los leads
curl -X POST http://localhost:3000/leads/ai/summary

# Con filtros
curl -X POST http://localhost:3000/leads/ai/summary \
  -H "Content-Type: application/json" \
  -d '{"fuente": "instagram"}'
```

## AI Integration

### Configuración

Por defecto usa el **Mock Provider**. Para usar OpenAI:

1. Obtener API key de OpenAI
2. Configurar en `.env`:
   ```
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-...
   ```

### Arquitectura

```
src/modules/ai/
├── ai.module.ts
├── ai.service.ts
├── ai.controller.ts
└── providers/
    ├── ai-provider.interface.ts
    ├── mock.provider.ts
    └── openai.provider.ts
```

El patrón **Provider** permite:

- Cambiar de mock a OpenAI sin modificar código de negocio
- Agregar nuevos proveedores (Anthropic, Google, etc.) fácilmente
- Testing simple con mocks

## Ejecutar en Desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

## Tests

```bash
# Unit tests
npm run test

# Coverage
npm run test:cov
```

## License

MIT
