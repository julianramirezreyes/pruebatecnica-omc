import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { Lead, Fuente } from '@prisma/client';

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: LeadsService;

  const mockLead: Lead = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    nombre: 'Test User',
    email: 'test@example.com',
    telefono: '+5491155550001',
    fuente: 'instagram' as Fuente,
    producto_interes: 'Curso de Marketing',
    presupuesto: 199.99,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  const mockLeadsService = {
    create: jest.fn().mockResolvedValue(mockLead),
    findAll: jest.fn().mockResolvedValue({
      data: [mockLead],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    findById: jest.fn().mockResolvedValue(mockLead),
    update: jest.fn().mockResolvedValue({ ...mockLead, presupuesto: 299.99 }),
    remove: jest
      .fn()
      .mockResolvedValue({ message: 'Lead deleted successfully' }),
    getStats: jest.fn().mockResolvedValue({
      total: 1,
      byFuente: [{ fuente: 'instagram', count: 1 }],
      avgPresupuesto: 199.99,
      last7Days: 1,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: mockLeadsService,
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    service = module.get<LeadsService>(LeadsService);
  });

  describe('create', () => {
    it('should create a lead', async () => {
      const dto = {
        nombre: 'Test User',
        email: 'test@example.com',
        fuente: 'instagram' as Fuente,
      };
      const result = await controller.create(dto);
      expect(result).toEqual(mockLead);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return paginated leads', async () => {
      const result = await controller.findAll({});
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getStats', () => {
    it('should return lead statistics', async () => {
      const result = await controller.getStats();
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('byFuente');
      expect(result).toHaveProperty('avgPresupuesto');
      expect(result).toHaveProperty('last7Days');
      expect(service.getStats).toHaveBeenCalled();
    });
  });
});
