import { Inject, Injectable } from '@nestjs/common';
import {
  LinksRepositoryInterface,
  TYPE_LinksRepositoryInterface,
} from '@domain/links/repository/links.repository.interface';
import { BotContext } from '@interfaces/interfaces';
import { isURL } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '@utils';
import { Markup } from 'telegraf';
import { ActionsEnum } from '@interfaces/enums';
import { BOT_BUTTONS, BOT_MESSAGES } from '@application/constants';
import { Link, User } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(
    @Inject(TYPE_LinksRepositoryInterface)
    private repository: LinksRepositoryInterface,
  ) {}

  public async setUserToDb(userId: number): Promise<User> {
    return this.repository.setUserToDb(userId);
  }

  public async handleLink(ctx: BotContext) {
    const telegramId = ctx.from.id;

    if (ctx.session.isAddingLink) {
      await this.handleAddingLink(ctx, telegramId);
    } else if (ctx.session.isGettingLink) {
      await this.handleGettingLink(ctx);
    }
  }

  public async getAllLinks(): Promise<string | null> {
    const links = await this.repository.getAllLinks();

    if (links.length === 0) {
      return null;
    }

    return links
      .map((link) => {
        return `<b>${link.title}</b>: <code>${link.url}</code> | <code>${link.code}</code>`;
      })
      .join('\n');
  }

  public async deleteLink(code: string) {
    return this.repository.deleteLink(code);
  }

  private async getLink(code: string) {
    return this.repository.getLink(code);
  }

  private async handleAddingLink(ctx: BotContext, telegramId: number) {
    const input = ctx.text;
    const [linkName, url] = input.split(' ');

    if (!linkName || !url) {
      await sendMessage(ctx, BOT_MESSAGES.INPUT_URL_ERROR);
      return;
    }

    if (!isURL(url)) {
      await ctx.reply(BOT_MESSAGES.URL_ERROR);
      return;
    }

    const uniqueCode = uuidv4();

    try {
      await this.repository.setLinkToDb(url, linkName, uniqueCode, telegramId);
      await this.sendLinkAddedResponse(ctx, uniqueCode);
      ctx.session.isAddingLink = false;
    } catch (e) {
      ctx.session.isAddingLink = false;
      await ctx.reply(`Произошла ошибка: ${e.message}`);
    }
  }

  private async sendLinkAddedResponse(ctx: BotContext, uniqueCode: string) {
    await sendMessage(
      ctx,
      `${BOT_MESSAGES.INPUT_URL_SUCCESS}<code>${uniqueCode}</code>`,
    );
    await ctx.reply(
      BOT_MESSAGES.INPUT_NEXT_STEP,
      Markup.inlineKeyboard([
        [Markup.button.callback(BOT_BUTTONS.ADD_LINK, ActionsEnum.ADD_LINK)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINKS, ActionsEnum.GET_LINKS)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINK, ActionsEnum.GET_LINK)],
      ]),
    );
  }

  private async handleGettingLink(ctx: BotContext) {
    const code = ctx.text;
    const link = await this.getLink(code);

    if (link) {
      await this.sendFoundLinkResponse(ctx, link);
      ctx.session.isGettingLink = false;
    } else {
      await ctx.reply(BOT_MESSAGES.URL_FIND_ERROR);
    }
  }

  private async sendFoundLinkResponse(ctx: BotContext, link: Link) {
    await sendMessage(
      ctx,
      `${BOT_MESSAGES.URL_FIND}<b>${link.title}</b>: <code>${link.url}</code>`,
    );
    await ctx.reply(
      BOT_MESSAGES.INPUT_NEXT_STEP,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            BOT_MESSAGES.URL_DELETE,
            `${ActionsEnum.DELETE_LINK}_${link.code}`,
          ),
        ],
        [Markup.button.callback(BOT_BUTTONS.HOME, ActionsEnum.HOME)],
      ]),
    );
  }
}
