import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import Emojis from '../../../config/Emojis';
import { Constants } from '../../../config/constants';
import BaseSlashCommand from '../../../interfaces/commands/BaseSlashCommand';

class Ping extends BaseSlashCommand {
  constructor() {
    super();
    this.setName('ping').setDescription('Shows bot and server latency with a dash of style');
    // TODO: Add a cooldown to this command and automatic category
    // this.setDMPermission(false);
    // this.setNSFW(false);
    // this.setDevOnly(false);
    // this.setGuildOnly(false);
    // this.setOwnerOnly(false);
    // this.setPremiumOnly(false);
    // this.setRestricted(false);
    // this.setCategory('Information');
    // this.setSubcategory('General');
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const client = interaction.client;

    // Calculate uptime accurately
    let totalSeconds = Math.floor(client.uptime / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Embed loading
    const loadingEmbed = new EmbedBuilder().setDescription('⏳ **Calculating Ping… Hold tight!**').setColor(0x1e90ff);

    await interaction.reply({ embeds: [loadingEmbed] });

    // Small delay to simulate “calculation”
    setTimeout(async () => {
      const clientPing = Math.round(client.ws.ping);
      const guildPing = Date.now() - interaction.createdTimestamp;

      const pingEmbed = new EmbedBuilder()
        .setTitle(`${Emojis.ping_pong} Pong! Check out the stats below:`)
        .setDescription(
          `**${Emojis.satellite} Client Ping:** \`${clientPing}ms\`\n` +
            `**${Emojis.globe_with_meridians} Guild Ping:** \`${guildPing}ms\`\n` +
            `**${Emojis.robot} Bot Uptime:** ${uptime}`,
        )
        .setColor(Constants.COLORS.primary)
        .setFooter({ text: `${Emojis.flashlight} Fast and reliable — just like me!` });

      await interaction.editReply({ embeds: [pingEmbed] });
    }, 1500); // shorter delay, more responsive
  }
}

// noinspection JSUnusedGlobalSymbols
export default Ping;
