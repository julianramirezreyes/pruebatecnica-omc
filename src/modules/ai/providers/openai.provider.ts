import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Lead } from '@prisma/client';
import {
  IAiProvider,
  AISummaryResult,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAiProvider implements IAiProvider {
  constructor(private readonly configService: ConfigService) {}

  async generateSummary(leads: Lead[]): Promise<AISummaryResult> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      throw new Error(
        'OpenAI API key not configured. Set OPENAI_API_KEY in .env',
      );
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
    } catch {
      return {
        summary: content,
        recommendations: ['Revisa la respuesta de la API manualmente.'],
      };
    }
  }
}
