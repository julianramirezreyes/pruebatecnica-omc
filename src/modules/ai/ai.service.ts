import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LeadsService } from '../leads/leads.service';
import {
  IAiProvider,
  AISummaryResult,
} from './interfaces/ai-provider.interface';
import { MockAiProvider } from './providers/mock.provider';
import { OpenAiProvider } from './providers/openai.provider';

@Injectable()
export class AiService {
  private aiProvider: IAiProvider;

  constructor(
    private readonly leadsService: LeadsService,
    private readonly configService: ConfigService,
    private readonly mockProvider: MockAiProvider,
    private readonly openAiProvider: OpenAiProvider,
  ) {
    const provider = this.configService.get<string>('AI_PROVIDER', 'mock');
    this.aiProvider =
      provider === 'openai' ? this.openAiProvider : this.mockProvider;
  }

  async generateSummary(filters: {
    fuente?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<AISummaryResult> {
    const leads = await this.leadsService.getLeadsForAI(filters);
    return this.aiProvider.generateSummary(leads);
  }
}
