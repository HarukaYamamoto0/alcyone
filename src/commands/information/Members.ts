import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { Constants } from '../../config/constants';
import { Emojis } from '../../config/emojis';

class Members extends BaseCommand {
  constructor() {
    super();
    this.setName('members');
    this.setDescription(`${Emojis.busts_in_silhouette} Shows the number of human and bot members on the server`);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guild = interaction.guild;
    if (!guild) {
      await interaction.reply({
        content: `${Emojis.error} This command can only be used on servers.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const humans = guild.members.cache.filter((member) => !member.user.bot).size;
    const bots = guild.members.cache.filter((member) => member.user.bot).size;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Members of ${guild.name.length > 20 ? guild.name.slice(0, 10) + '...' : guild.name}`,
        iconURL: guild.iconURL() || undefined,
      })
      .setDescription(`**Humans:** \`${humans}\`\n**Bots:** \`${bots}\`\n**Total:** \`${guild.memberCount}\``)
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor(Constants.COLORS.primary);

    await interaction.reply({ embeds: [embed] });
  }
}

export default Members;
