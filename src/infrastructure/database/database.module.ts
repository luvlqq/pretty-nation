import { Module } from '@nestjs/common';

import { PrismaService } from '@infrastructure/db';

@Module({
  providers: [PrismaService],
  exports: [PrismaService, PrismaModule],
})
export class PrismaModule {}
