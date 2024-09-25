import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sigInt, sigTerm } from '@utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  const PORT = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  sigInt(app);
  sigTerm(app);

  await app.listen(PORT || 3000);
}
bootstrap();
