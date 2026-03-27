import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LeadsModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
