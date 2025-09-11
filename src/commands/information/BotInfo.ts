import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, version as discordVersion } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { version as botVersion } from '../../../package.json';

class BotInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('botinfo').setDescription('Shows information about the bot');
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const client = interaction.client;
    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username} Information`)
      .setColor('#00ff00')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: 'Bot Version', value: botVersion, inline: true },
        { name: 'Discord.js Version', value: discordVersion, inline: true },
        { name: 'Ping', value: `${client.ws.ping}ms`, inline: true },
        { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60)} minutes`, inline: true },
        { name: 'Servers', value: client.guilds.cache.size.toString(), inline: true },
        { name: 'Users', value: client.users.cache.size.toString(), inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}

// noinspection JSUnusedGlobalSymbols
export default BotInfo;
