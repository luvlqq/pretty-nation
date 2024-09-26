import { Module } from '@nestjs/common';
import { PrismaModule } from '@infrastructure/database/database.module';
import { TelegramModule } from '@infrastructure/telegram/telegraf.module';

@Module({
  imports: [PrismaModule, TelegramModule],
})
export class InfrastructureModule {}
