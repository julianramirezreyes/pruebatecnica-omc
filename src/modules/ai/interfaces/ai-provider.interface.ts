import { Lead } from '@prisma/client';

export interface AISummaryResult {
  summary: string;
  mainSource?: string;
  recommendations?: string[];
}

export interface IAiProvider {
  generateSummary(leads: Lead[]): Promise<AISummaryResult>;
}
