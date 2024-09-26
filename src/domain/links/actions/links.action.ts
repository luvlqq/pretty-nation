import { Action, Ctx, On, Update } from 'nestjs-telegraf';
import { ActionsEnum } from '@interfaces/enums';
import { Context, Markup } from 'telegraf';
import { BotContext } from '@interfaces/interfaces';
import { LinksService } from '@domain/links/services/links.service';
import { sendMessage } from '@utils';
import { BOT_BUTTONS, BOT_MESSAGES } from '@application/constants';

@Update()
export class LinksAction {
  constructor(private readonly linksService: LinksService) {}

  @Action(ActionsEnum.HOME)
  public async startCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply(
      BOT_MESSAGES.HOME,
      Markup.inlineKeyboard([
        [Markup.button.callback(BOT_BUTTONS.ADD_LINK, ActionsEnum.ADD_LINK)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINKS, ActionsEnum.GET_LINKS)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINK, ActionsEnum.GET_LINK)],
      ]),
    );
  }

  @Action(ActionsEnum.ADD_LINK)
  public async addLinkAction(@Ctx() ctx: BotContext): Promise<void> {
    await sendMessage(ctx, BOT_MESSAGES.INPUT_ADD_LINK);
    ctx.session.isAddingLink = true;
  }

  @Action(ActionsEnum.GET_LINKS)
  public async listLinksAction(@Ctx() ctx: Context): Promise<void> {
    const linksList = await this.linksService.getAllLinks();

    if (!linksList) {
      await ctx.reply(
        BOT_MESSAGES.USER_NO_LINKS,
        Markup.inlineKeyboard([
          [Markup.button.callback(BOT_BUTTONS.HOME, ActionsEnum.HOME)],
        ]),
      );
      return;
    }

    await ctx.reply(BOT_MESSAGES.USER_LINKS);
    await sendMessage(ctx, linksList);
    await ctx.reply(
      BOT_MESSAGES.INPUT_NEXT_STEP,
      Markup.inlineKeyboard([
        [Markup.button.callback(BOT_BUTTONS.ADD_LINK, ActionsEnum.ADD_LINK)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINK, ActionsEnum.GET_LINK)],
      ]),
    );
  }

  @Action(ActionsEnum.GET_LINK)
  public async getLink(@Ctx() ctx: BotContext): Promise<void> {
    await ctx.reply(BOT_MESSAGES.INPUT_URL_CODE);
    ctx.session.isGettingLink = true;
  }

  @Action(new RegExp(`${ActionsEnum.DELETE_LINK}_(.+)`))
  public async deleteLink(@Ctx() ctx: BotContext): Promise<void> {
    const code = ctx.match[1];

    const deleted = await this.linksService.deleteLink(code);

    if (deleted) {
      await sendMessage(
        ctx,
        BOT_MESSAGES.INPUT_URL_DELETE + `<code>${code}</code>`,
      );
      await ctx.reply(
        BOT_MESSAGES.INPUT_NEXT_STEP,
        Markup.inlineKeyboard([
          [Markup.button.callback(BOT_BUTTONS.HOME, ActionsEnum.HOME)],
        ]),
      );
    } else {
      await sendMessage(ctx, BOT_MESSAGES.URL_DELETE_ERROR);
    }
  }

  @On('text')
  public async handleLink(@Ctx() ctx: BotContext): Promise<void> {
    return this.linksService.handleLink(ctx);
  }
}
