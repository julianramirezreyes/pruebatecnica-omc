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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const leads_service_1 = require("../leads/leads.service");
const mock_provider_1 = require("./providers/mock.provider");
const openai_provider_1 = require("./providers/openai.provider");
let AiService = class AiService {
    leadsService;
    configService;
    mockProvider;
    openAiProvider;
    aiProvider;
    constructor(leadsService, configService, mockProvider, openAiProvider) {
        this.leadsService = leadsService;
        this.configService = configService;
        this.mockProvider = mockProvider;
        this.openAiProvider = openAiProvider;
        const provider = this.configService.get('AI_PROVIDER', 'mock');
        this.aiProvider =
            provider === 'openai' ? this.openAiProvider : this.mockProvider;
    }
    async generateSummary(filters) {
        const leads = await this.leadsService.getLeadsForAI(filters);
        return this.aiProvider.generateSummary(leads);
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leads_service_1.LeadsService,
        config_1.ConfigService,
        mock_provider_1.MockAiProvider,
        openai_provider_1.OpenAiProvider])
], AiService);
//# sourceMappingURL=ai.service.js.map