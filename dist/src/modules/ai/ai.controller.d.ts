import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    generateSummary(dto: any): Promise<import("./interfaces/ai-provider.interface").AISummaryResult>;
    generateSummaryDefault(): Promise<import("./interfaces/ai-provider.interface").AISummaryResult>;
}
