import { z } from 'zod';

import { createTRPCRouter } from '../trpc';
import { adminProcedure } from '../procedures/auth';

import { sendDiscordMessage } from 'lib/discord';

const schema = z.object({
  channelId: z.string().min(1),
  message: z.string(),
});

const discordRouter = createTRPCRouter({
  sendMessage: adminProcedure
    .input(schema)
    .mutation(async ({ input: { channelId, message } }) => {
      await sendDiscordMessage({ channelId, content: message });
    }),
});

export default discordRouter;
