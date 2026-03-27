import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('leads/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summary')
  async generateSummary(@Body() dto: any) {
    return this.aiService.generateSummary(dto);
  }

  @Get('summary')
  async generateSummaryDefault() {
    return this.aiService.generateSummary({});
  }
}
