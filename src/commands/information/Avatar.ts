import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { Emojis } from '../../config/emojis';
import { Constants } from '../../config/constants';

class Avatar extends BaseCommand {
  constructor() {
    super();
    this.setName('avatar');
    this.setDescription(`${Emojis.frame_photo}️ Shows the avatar`);
    this.addUserOption((option) =>
      option.setName('user').setDescription('Choose a user to see the avatar').setRequired(false),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const client = interaction.client;
    const userId = interaction.options.getUser('user') || interaction.user.id;

    let user;
    try {
      user = await client.users.fetch(userId);
    } catch {
      await interaction.reply({
        content: `${Emojis.error}️ I couldn't find this user.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const avatarUrl = user.displayAvatarURL({ size: 2048 });

    const embed = new EmbedBuilder()
      .setTitle(`${Emojis.frame_photo} Avatar of ${user.username}`)
      .setDescription(`[Click here](${avatarUrl}) to download the image`)
      .setImage(avatarUrl)
      .setColor(Constants.COLORS.primary);

    await interaction.reply({ embeds: [embed] });
  }
}

export default Avatar;
