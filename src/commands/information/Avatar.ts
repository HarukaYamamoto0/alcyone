import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class Avatar extends BaseCommand {
  constructor() {
    super();
    this.setName('avatar');
    this.setDescription('🖼️ Shows the avatar');
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
        content: "❌ I couldn't find this user.",
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const avatarUrl = user.displayAvatarURL({ size: 2048 });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Avatar of ${user.username}`)
      .setDescription(`[Click here](${avatarUrl}) to download the image`)
      .setImage(avatarUrl)
      .setColor(0x1e90ff);

    await interaction.reply({ embeds: [embed] });
  }
}

// noinspection JSUnusedGlobalSymbols
export default Avatar;
