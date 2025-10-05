import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField, PermissionFlagsBits } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { Constants } from '../../config/constants';
import { Emojis } from '../../config/emojis';

class KickMember extends BaseCommand {
  constructor() {
    super();
    this.setName('kick');
    this.setDescription(`${Emojis.boot} Kick a user from the server`);
    this.addUserOption((option) => option.setName('user').setDescription('The user to kick').setRequired(true));
    this.addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for the kick (max 1000 chars)')
        .setMaxLength(1000)
        .setRequired(false),
    );
    this.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guild = interaction.guild;
    if (!guild) {
      await interaction.reply({
        content: `${Emojis.error}This command must be used in a server.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const authorMember = await guild.members.fetch(interaction.user.id);
    const targetUser = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason specified';

    const me = guild.members.me;
    if (!me?.permissions.has(PermissionFlagsBits.KickMembers)) {
      await interaction.reply({
        content: `${Emojis.error}I don’t have permission to kick members.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const memberTarget = await guild.members.fetch(targetUser.id);
    if (!memberTarget) {
      await interaction.reply({
        content: `${Emojis.error}Could not find that user in this server.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Safety checks
    if (memberTarget.id === authorMember.id) {
      await interaction.reply({
        content: `${Emojis.error}You can’t kick yourself.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }
    if (memberTarget.id === me.id) {
      await interaction.reply({
        content: `${Emojis.error}You can’t kick me.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }
    if (interaction.member && 'roles' in interaction.member) {
      if (authorMember.roles.highest.position <= memberTarget.roles.highest.position) {
        await interaction.reply({
          content: `${Emojis.error}You cannot kick someone with equal or higher role than yours.`,
          flags: MessageFlagsBitField.Flags.Ephemeral,
        });
        return;
      }
    }
    if (me.roles.highest.position <= memberTarget.roles.highest.position) {
      await interaction.reply({
        content: `${Emojis.error}I cannot kick someone with equal or higher role than mine.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    // Try to kick
    try {
      await memberTarget.kick(reason);

      const embed = new EmbedBuilder()
        .setTitle(`${Emojis.boot} User Kicked`)
        .setColor(Constants.COLORS.primary)
        .addFields(
          { name: 'Kicked User', value: `\`${memberTarget.user.tag}\``, inline: true },
          { name: 'User ID', value: `\`${memberTarget.id}\``, inline: true },
          { name: 'Kicked By', value: `\`${authorMember.user.tag}\``, inline: true },
          { name: 'Author ID', value: `\`${authorMember.user.id}\``, inline: true },
          { name: 'Reason', value: `\`${reason}\``, inline: false },
        )
        .setThumbnail(memberTarget.user.displayAvatarURL())
        .setFooter({ text: `Punished in ${guild.name}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      // Optional mod-log
      const modLogChannelId = process.env.MOD_LOG_CHANNEL_ID;
      if (modLogChannelId) {
        const modLogChannel = guild.channels.cache.get(modLogChannelId);
        if (modLogChannel?.isTextBased()) {
          const modLogEmbed = EmbedBuilder.from(embed).setTitle('📒 Mod Log - Kick');
          await modLogChannel.send({ embeds: [modLogEmbed] });
        }
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `❌ An error occurred while trying to kick **${memberTarget.user.tag}**.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }
  }
}

export default KickMember;
