import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LinksModule } from '@domain/links/links.module';
import { session } from 'telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_KEY'),
        middlewares: [session()],
      }),
    }),
    LinksModule,
  ],
})
export class AppModule {}
