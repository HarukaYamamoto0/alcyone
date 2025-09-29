import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class ServerIcon extends BaseCommand {
  constructor() {
    super();
    this.setName('servericon');
    this.setDescription('🖼️ Show the server icon');
    this.addStringOption((option) =>
      option.setName('id').setDescription('Optional server ID to fetch the icon from').setRequired(false),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const serverId = interaction.options.getString('id');
    let guild = interaction.guild;

    if (serverId) {
      guild = interaction.client.guilds.cache.get(serverId) || null;
    }

    if (!guild) {
      await interaction.reply({
        content: '❌ Could not find the specified server or you are not in it.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const iconUrl = guild.iconURL({ size: 2048, extension: 'png' }) || null;
    if (!iconUrl) {
      await interaction.reply({
        content: `❌ The server **${guild.name}** does not have an icon.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Icon of ${guild.name}`)
      .setDescription(`**[Click here](${iconUrl}) to download the image**`)
      .setImage(iconUrl)
      .setColor(0x3498db)
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}

// noinspection JSUnusedGlobalSymbols
export default ServerIcon;
