import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from '@domain/links/links.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LinksModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
