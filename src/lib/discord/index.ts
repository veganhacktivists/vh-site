import { ChannelType, Client, GatewayIntentBits } from 'discord.js';

import type { Message, MessageCreateOptions } from 'discord.js';

const discordGlobal = global as typeof global & {
  discord?: Client;
};

const createClient = () => {
  const discord = new Client({ intents: [GatewayIntentBits.GuildMessages] });
  void discord.login(process.env.DISCORD_TOKEN);

  return discord;
};

const discord = discordGlobal.discord || createClient();

discord.on('ready', () => {
  // eslint-disable-next-line no-console
  console.info('Discord client ready!');
});

export const getDiscordChannel = async (id: string) => {
  return await discord.channels.fetch(id);
};

export const getDiscordServer = async (id: string) => {
  if (!id) {
    throw new Error('No server ID provided');
  }
  const cachedServer = discord.guilds.cache.get(id);

  if (!cachedServer || !cachedServer.approximateMemberCount) {
    return await discord.guilds.fetch({
      guild: id,
      withCounts: true,
      force: true,
    });
  }

  return cachedServer;
};

export const sendDiscordMessage = async ({
  channelId,
  ...options
}: {
  channelId?: string;
} & MessageCreateOptions) => {
  if (!channelId) {
    throw new Error(
      `ChannelId is required, got ${
        channelId === undefined ? 'undefined' : `'${channelId}'`
      }`
    );
  }
  const channel = await getDiscordChannel(channelId);
  if (!channel || channel.type !== ChannelType.GuildText) {
    throw new Error(
      `Channel ${channelId} not found or is not a a valid text channel. Got ${JSON.stringify(
        channel
      )}`
    );
  }
  return await channel.send(options);
};

export class DiscordSendMessagesError extends Error {
  public messages: (Message | false)[];

  constructor(messages: (Message | false)[]) {
    super('DiscordError');
    this.name = 'DiscordError';
    this.message = 'An error happened trying to send messages to Discord';
    this.messages = messages;
  }
  getOkMessages() {
    return this.messages.filter((m) => !!m) as Message[];
  }

  getErroredMessages() {
    return this.messages.filter((m) => !m) as false[];
  }
}

if (process.env.NODE_ENV !== 'production') {
  discordGlobal.discord = discord;
}

export default discord;
