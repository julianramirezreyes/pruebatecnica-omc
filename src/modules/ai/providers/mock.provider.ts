import { Injectable } from '@nestjs/common';
import { Lead } from '@prisma/client';
import {
  IAiProvider,
  AISummaryResult,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class MockAiProvider implements IAiProvider {
  async generateSummary(leads: Lead[]): Promise<AISummaryResult> {
    if (leads.length === 0) {
      return {
        summary: 'No hay leads disponibles para analizar.',
        recommendations: [
          'Considera aumentar las inversiones en marketing para generar más leads.',
        ],
      };
    }

    const fuenteCounts: Record<string, number> = {};
    for (const lead of leads) {
      const key = String(lead.fuente);
      fuenteCounts[key] = (fuenteCounts[key] || 0) + 1;
    }

    let mainSourceKey = 'unknown';
    let mainSourceCount = 0;
    for (const [key, count] of Object.entries(fuenteCounts)) {
      if (count > mainSourceCount) {
        mainSourceKey = key;
        mainSourceCount = count;
      }
    }

    const totalPresupuesto = leads.reduce(
      (sum, l) => sum + (Number(l.presupuesto) || 0),
      0,
    );
    const avgPresupuesto = totalPresupuesto / leads.length;

    const productosInteres: Record<string, number> = {};
    for (const lead of leads) {
      if (lead.producto_interes) {
        productosInteres[lead.producto_interes] =
          (productosInteres[lead.producto_interes] || 0) + 1;
      }
    }

    let topProductoKey = '';
    let topProductoCount = 0;
    for (const [key, count] of Object.entries(productosInteres)) {
      if (count > topProductoCount) {
        topProductoKey = key;
        topProductoCount = count;
      }
    }

    const percentage = ((mainSourceCount / leads.length) * 100).toFixed(1);
    const summary = `Análisis de ${leads.length} leads: La fuente principal es ${mainSourceKey} con ${mainSourceCount} leads (${percentage}%). El presupuesto promedio es de $${avgPresupuesto.toFixed(2)}. ${topProductoKey ? `El producto más solicitado es "${topProductoKey}" con ${topProductoCount} interesse(s).` : ''}`;

    const recommendations: string[] = [];
    if (mainSourceCount / leads.length > 0.5) {
      recommendations.push(
        `Considera diversificar tus fuentes de leads. El ${mainSourceKey} representa más del 50%.`,
      );
    }
    if (avgPresupuesto < 100) {
      recommendations.push(
        'El presupuesto promedio es bajo. Considera ofrecer opciones de menor costo o planes de pago.',
      );
    }
    recommendations.push('Continúa capturando leads para mejorar el análisis.');

    return {
      summary,
      mainSource: mainSourceKey,
      recommendations,
    };
  }
}
