import { Module } from '@nestjs/common';
import { LinksService } from '@domain/links/services/links.service';
import { LinksHandler } from '@application/handlers/links.handler';
import { LinksAction } from '@domain/links/actions/links.action';
import { TYPE_LinksRepositoryInterface } from '@domain/links/repository/links.repository.interface';
import { LinksRepository } from '@infrastructure/database/repository';
import { PrismaModule } from '@infrastructure/database/database.module';

@Module({
  imports: [PrismaModule],
  providers: [
    LinksService,
    LinksHandler,
    LinksAction,
    LinksRepository,
    { provide: TYPE_LinksRepositoryInterface, useClass: LinksRepository },
  ],
})
export class LinksModule {}
