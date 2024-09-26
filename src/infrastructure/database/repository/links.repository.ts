import { Injectable } from '@nestjs/common';
import { LinksRepositoryInterface } from '@domain/links/repository/links.repository.interface';
import { Link, User } from '@prisma/client';
import { PrismaService } from '@infrastructure/db';

@Injectable()
export class LinksRepository implements LinksRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  public async setUserToDb(userId: number): Promise<User> {
    return this.prisma.user.upsert({
      where: { telegramId: userId },
      update: {},
      create: {
        telegramId: userId,
      },
    });
  }

  public async setLinkToDb(
    link: string,
    title: string,
    uniqueCode: string,
    userId: number,
  ): Promise<Link> {
    return this.prisma.link.create({
      data: {
        url: link,
        title: title,
        code: uniqueCode,
        user: {
          connect: { telegramId: userId },
        },
      },
    });
  }

  public async getAllLinks(): Promise<Link[]> {
    return this.prisma.link.findMany();
  }

  public async getLink(code: string): Promise<Link> {
    return this.prisma.link.findUnique({ where: { code } });
  }

  public async deleteLink(code: string): Promise<Link> {
    return this.prisma.link.delete({ where: { code } });
  }
}
