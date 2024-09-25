import { Context } from 'telegraf';

export async function sendMessage(ctx: Context, text: string) {
  await ctx.reply(text, { parse_mode: 'HTML' });
}
