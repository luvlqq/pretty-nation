import { Link, User } from '@prisma/client';

export const TYPE_LinksRepositoryInterface = Symbol(
  'Domain.linksRepositoryInterface',
);

export interface LinksRepositoryInterface {
  setUserToDb(userId: number): Promise<User>;
  setLinkToDb(
    link: string,
    title: string,
    uniqueCode: string,
    userId: number,
  ): Promise<Link>;
  getAllLinks(): Promise<Link[]>;
  getLink(code: string): Promise<Link>;
  deleteLink(code: string): Promise<Link>;
}
