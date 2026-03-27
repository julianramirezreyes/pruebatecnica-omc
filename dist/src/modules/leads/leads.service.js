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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const leads_repository_1 = require("./leads.repository");
const client_1 = require("@prisma/client");
let LeadsService = class LeadsService {
    leadsRepository;
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    async create(dto) {
        try {
            return await this.leadsRepository.create(dto);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async findAll(query) {
        return this.leadsRepository.findAll(query);
    }
    async findById(id) {
        const lead = await this.leadsRepository.findById(id);
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async update(id, dto) {
        await this.findById(id);
        try {
            return await this.leadsRepository.update(id, dto);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async remove(id) {
        await this.findById(id);
        await this.leadsRepository.softDelete(id);
        return { message: 'Lead deleted successfully' };
    }
    async getStats() {
        return this.leadsRepository.getStats();
    }
    async getLeadsForAI(filters) {
        return this.leadsRepository.findForAI(filters);
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leads_repository_1.LeadsRepository])
], LeadsService);
//# sourceMappingURL=leads.service.js.map