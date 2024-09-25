import { Module } from '@nestjs/common';

import { PrismaService } from './services/database.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService, PrismaModule],
})
export class PrismaModule {}
