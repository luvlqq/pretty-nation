import { Ctx, Help, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { ActionsEnum } from '@interfaces/enums';
import { BOT_BUTTONS, BOT_MESSAGES } from '@application/constants';
import { LinksService } from '@domain/links/services/links.service';

@Update()
export class LinksHandler {
  constructor(private readonly linksService: LinksService) {}

  @Start()
  public async startCommand(@Ctx() ctx: Context): Promise<void> {
    await this.linksService.setUserToDb(ctx.from.id);
    await ctx.reply(
      BOT_MESSAGES.START,
      Markup.inlineKeyboard([
        [Markup.button.callback(BOT_BUTTONS.ADD_LINK, ActionsEnum.ADD_LINK)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINKS, ActionsEnum.GET_LINKS)],
        [Markup.button.callback(BOT_BUTTONS.GET_LINK, ActionsEnum.GET_LINK)],
      ]),
    );
  }

  @Help()
  public async help(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply(BOT_MESSAGES.HELP);
  }
}
