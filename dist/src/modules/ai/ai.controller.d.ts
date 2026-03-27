import { AiService } from './ai.service';
declare class GenerateSummaryDto {
    fuente?: string;
    startDate?: string;
    endDate?: string;
}
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    generateSummary(dto: GenerateSummaryDto): Promise<import("./interfaces/ai-provider.interface").AISummaryResult>;
    generateSummaryDefault(): Promise<import("./interfaces/ai-provider.interface").AISummaryResult>;
}
export {};
