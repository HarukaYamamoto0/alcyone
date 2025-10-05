import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, version as discordVersion } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { version as botVersion } from '../../../package.json';
import { Emojis } from '../../config/emojis';
import { Constants } from '../../config/constants';

class BotInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('botinfo').setDescription(`${Emojis.statics} Shows detailed information about the bot`);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const client = interaction.client;

    // format uptime as D H M S
    const formatUptime = (ms: number) => {
      const sec = Math.floor(ms / 1000) % 60;
      const min = Math.floor(ms / (1000 * 60)) % 60;
      const hrs = Math.floor(ms / (1000 * 60 * 60)) % 24;
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      return `${days}d ${hrs}h ${min}m ${sec}s`;
    };

    const uptime = formatUptime(client.uptime ?? 0);
    const apiLatency = Date.now() - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setTitle(`🤖 ${client.user.username} — Bot Information`)
      .setColor(Constants.COLORS.primary)
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        {
          name: `${Emojis.package} Versions`,
          value: `• Bot: v${botVersion}\n• Discord.js: v${discordVersion}\n• Node.js: ${process.version}`,
          inline: false,
        },
        {
          name: `${Emojis.statics} Stats`,
          value: `• Ping: ${client.ws.ping}ms (WS)\n• API Latency: ${apiLatency}ms\n• Uptime: ${uptime}`,
          inline: false,
        },
        {
          name: `${Emojis.map} Environment`,
          value: `• Servers: ${client.guilds.cache.size}\n• Cached Users: ${client.users.cache.size}\n• Platform: ${process.platform}`,
          inline: false,
        },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}

export default BotInfo;
