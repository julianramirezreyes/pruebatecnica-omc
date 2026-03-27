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
exports.OpenAiProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let OpenAiProvider = class OpenAiProvider {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async generateSummary(leads) {
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey || apiKey === 'your-openai-api-key-here') {
            throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY in .env');
        }
        const leadsData = leads.map((l) => ({
            nombre: l.nombre,
            email: l.email,
            fuente: l.fuente,
            presupuesto: l.presupuesto ? Number(l.presupuesto) : null,
            producto_interes: l.producto_interes,
        }));
        const prompt = `Eres un asistente de análisis de negocios. Analiza los siguientes leads y genera un resumen ejecutivo con recomendaciones.

Leads:
${JSON.stringify(leadsData, null, 2)}

Responde en formato JSON con:
{
  "summary": "resumen general del análisis",
  "mainSource": "fuente principal de leads",
  "recommendations": ["recomendación 1", "recomendación 2"]
}`;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
            }),
        });
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }
        const data = await response.json();
        const content = data.choices[0].message.content;
        try {
            return JSON.parse(content);
        }
        catch {
            return {
                summary: content,
                recommendations: ['Revisa la respuesta de la API manualmente.'],
            };
        }
    }
};
exports.OpenAiProvider = OpenAiProvider;
exports.OpenAiProvider = OpenAiProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAiProvider);
//# sourceMappingURL=openai.provider.js.map