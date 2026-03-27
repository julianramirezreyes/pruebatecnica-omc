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

    const fuenteCounts = leads.reduce(
      (acc, lead) => {
        acc[lead.fuente] = (acc[lead.fuente] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const mainSource = Object.entries(fuenteCounts).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const totalPresupuesto = leads.reduce(
      (sum, l) => sum + (Number(l.presupuesto) || 0),
      0,
    );
    const avgPresupuesto = totalPresupuesto / leads.length;

    const productosInteres = leads
      .filter((l) => l.producto_interes)
      .reduce(
        (acc, l) => {
          if (l.producto_interes) {
            acc[l.producto_interes] = (acc[l.producto_interes] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

    const topProducto = Object.entries(productosInteres).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const summary = `Análisis de ${leads.length} leads: La fuente principal es ${mainSource[0]} con ${mainSource[1]} leads (${((mainSource[1] / leads.length) * 100).toFixed(1)}%). El presupuesto promedio es de $${avgPresupuesto.toFixed(2)}. ${topProducto ? `El producto más solicitado es "${topProducto[0]}" con ${topProducto[1]} interesse(s).` : ''}`;

    const recommendations: string[] = [];
    if (mainSource[1] / leads.length > 0.5) {
      recommendations.push(
        `Considera diversificar tus fuentes de leads. El ${mainSource[0]} representa más del 50%.`,
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
      mainSource: mainSource[0],
      recommendations,
    };
  }
}
