import { ConfigService } from '@nestjs/config';
import { Lead } from '@prisma/client';
import { IAiProvider, AISummaryResult } from '../interfaces/ai-provider.interface';
export declare class OpenAiProvider implements IAiProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    generateSummary(leads: Lead[]): Promise<AISummaryResult>;
}
