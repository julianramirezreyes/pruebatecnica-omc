import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiSummaryDto } from './dto/ai-summary.dto';

@Controller('leads/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summary')
  async generateSummary(@Body() dto: AiSummaryDto) {
    return this.aiService.generateSummary(dto);
  }

  @Get('summary')
  async generateSummaryDefault() {
    return this.aiService.generateSummary({});
  }
}
