import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField, PermissionFlagsBits } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class Unban extends BaseCommand {
  constructor() {
    super();
    this.setName('unban');
    this.setDescription('♻️ Unban a user by ID');
    this.addStringOption((option) =>
      option.setName('user_id').setDescription('The ID of the user to unban').setRequired(true),
    );
    this.addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for the unban (max 1000 chars)')
        .setMaxLength(1000)
        .setRequired(false),
    );
    this.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guild = interaction.guild;
    const author = interaction.user;
    const userId = interaction.options.getString('user_id', true);
    const reason = interaction.options.getString('reason') || 'No reason specified';

    if (!guild) {
      await interaction.reply({
        content: '❌ This command must be used in a server.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const me = guild.members.me;
    if (!me?.permissions.has(PermissionFlagsBits.BanMembers)) {
      await interaction.reply({
        content: '❌ I don’t have permission to unban members.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    try {
      const bans = await guild.bans.fetch();
      const bannedUser = bans.get(userId);

      if (!bannedUser) {
        await interaction.reply({
          content: '❌ No user with that ID is banned.',
          flags: MessageFlagsBitField.Flags.Ephemeral,
        });
        return;
      }

      await guild.members.unban(userId, reason);
      const user = bannedUser.user;

      const embed = new EmbedBuilder()
        .setTitle('♻️ User Unbanned')
        .setColor(0x00ff00)
        .addFields(
          { name: 'Unbanned User', value: `\`${user.tag}\``, inline: true },
          { name: 'User ID', value: `\`${user.id}\``, inline: true },
          { name: 'Unbanned By', value: `\`${author.tag}\``, inline: true },
          { name: 'Author ID', value: `\`${author.id}\``, inline: true },
          { name: 'Reason', value: `\`${reason}\``, inline: false },
        )
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: `Punishment lifted in ${guild.name}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `❌ An error occurred while trying to unban user with ID \`${userId}\`.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default Unban;
