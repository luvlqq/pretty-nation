import { Context as TelegrafContext } from 'telegraf';
import { SessionDataInterface } from '@interfaces/interfaces';

export interface BotContext extends TelegrafContext {
  session: SessionDataInterface;
  match: RegExpMatchArray;
}
