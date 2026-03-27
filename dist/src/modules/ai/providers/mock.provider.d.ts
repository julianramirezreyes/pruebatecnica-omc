import { Lead } from '@prisma/client';
import { IAiProvider, AISummaryResult } from '../interfaces/ai-provider.interface';
export declare class MockAiProvider implements IAiProvider {
    generateSummary(leads: Lead[]): Promise<AISummaryResult>;
}
