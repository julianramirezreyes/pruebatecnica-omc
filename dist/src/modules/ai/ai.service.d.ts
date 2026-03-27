import { ConfigService } from '@nestjs/config';
import { LeadsService } from '../leads/leads.service';
import { AISummaryResult } from './interfaces/ai-provider.interface';
import { MockAiProvider } from './providers/mock.provider';
import { OpenAiProvider } from './providers/openai.provider';
export declare class AiService {
    private readonly leadsService;
    private readonly configService;
    private readonly mockProvider;
    private readonly openAiProvider;
    private aiProvider;
    constructor(leadsService: LeadsService, configService: ConfigService, mockProvider: MockAiProvider, openAiProvider: OpenAiProvider);
    generateSummary(filters: {
        fuente?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<AISummaryResult>;
}
