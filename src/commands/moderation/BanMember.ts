import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField, PermissionFlagsBits } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class Ban extends BaseCommand {
  constructor() {
    super();
    this.setName('ban');
    this.setDescription('🔨 Ban a user from the server');
    this.addUserOption((option) => option.setName('user').setDescription('The user to ban').setRequired(true));
    this.addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for banning the user (max 1000 chars)')
        .setMaxLength(1000)
        .setRequired(false),
    );
    // Set default permission so only members with BanMembers can run it
    this.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guild = interaction.guild;
    const author = interaction.user;
    const targetUser = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason specified';

    if (!guild) {
      await interaction.reply({
        content: '❌ This command must be used in a server.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Check bot permissions
    const me = guild.members.me;
    if (!me?.permissions.has(PermissionFlagsBits.BanMembers)) {
      await interaction.reply({
        content: '❌ I don’t have permission to ban members.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Fetch bans to check if already banned
    const bans = await guild.bans.fetch();
    if (bans.has(targetUser.id)) {
      await interaction.reply({
        content: '❌ That user is already banned.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Prevent banning self or bot
    if (targetUser.id === author.id) {
      await interaction.reply({
        content: '❌ You can’t ban yourself.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    if (targetUser.id === me.id) {
      await interaction.reply({
        content: '❌ You can’t ban me.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Try to ban
    try {
      await guild.members.ban(targetUser, { reason });

      const embed = new EmbedBuilder()
        .setTitle('🛡️ User Banned')
        .setColor(0xff0000)
        .addFields(
          { name: 'Banned User', value: `\`${targetUser.tag}\``, inline: true },
          { name: 'User ID', value: `\`${targetUser.id}\``, inline: true },
          { name: 'Banned By', value: `\`${author.tag}\``, inline: true },
          { name: 'Author ID', value: `\`${author.id}\``, inline: true },
          { name: 'Reason', value: `\`${reason}\``, inline: false },
        )
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: `Punished in ${guild.name}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `❌ An error occurred while trying to ban **${targetUser.tag}**.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }
  }
}

export default Ban;
