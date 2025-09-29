import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class Ping extends BaseCommand {
  constructor() {
    super();
    this.setName('ping').setDescription('🏓 Shows bot and server latency with a dash of style');
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
        .setTitle('🏓 Pong! Check out the stats below:')
        .setDescription(
          `**📡 Client Ping:** \`${clientPing}ms\`\n` +
            `**🌐 Guild Ping:** \`${guildPing}ms\`\n` +
            `**🤖 Bot Uptime:** ${uptime}`,
        )
        .setColor(0x00ff00)
        .setFooter({ text: '⚡ Fast and reliable — just like me!' });

      await interaction.editReply({ embeds: [pingEmbed] });
    }, 1500); // shorter delay, more responsive
  }
}

// noinspection JSUnusedGlobalSymbols
export default Ping;
