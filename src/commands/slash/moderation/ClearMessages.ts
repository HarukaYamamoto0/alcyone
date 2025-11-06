import type { ChatInputCommandInteraction, SlashCommandIntegerOption } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField, PermissionsBitField } from 'discord.js';
import moment from 'moment';
import 'moment/locale/en-gb';
import { Constants } from '../../../config/constants';
import Emojis from '../../../config/Emojis';
import BaseSlashCommand from '../../../interfaces/commands/BaseSlashCommand';

class ClearMessages extends BaseSlashCommand {
  constructor() {
    super();
    this.setName('clear');
    this.setDescription('Deletes a set amount of messages in the current channel.');
    this.data.addIntegerOption((option: SlashCommandIntegerOption) =>
      option.setName('amount').setDescription('Number of messages to delete (1-99)').setRequired(true),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const amount = interaction.options.getInteger('amount', true);

    if (!interaction.guild || !interaction.channel || !interaction.inGuild()) {
      await interaction.reply({
        content: `${Emojis.x} This command can only be used inside a server channel.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const me = await interaction.guild.members.fetchMe();
    const member = await interaction.guild.members.fetch(interaction.user.id);

    // Permission checks
    if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      await interaction.reply({
        content: `${Emojis.x} You need the **Manage Messages** permission to use this command.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    if (!me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      await interaction.reply({
        content: `${Emojis.x} I need the **Manage Messages** permission to perform this action.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    if (amount < 1 || amount > 99) {
      await interaction.reply({
        content: `${Emojis.x} Please provide a number between **1** and **99**.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    try {
      const channel = interaction.channel;
      const messages = await channel.bulkDelete(amount, true);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `Moderation - ${interaction.client.user.username} - Clear`,
          iconURL: interaction.client.user.displayAvatarURL() ?? undefined,
        })
        .setDescription(`✅ Successfully deleted **${messages.size}** messages in this channel.`)
        .setColor(0xff0000)
        .setFooter({
          text: `Channel Clear • ${interaction.guild.name}`,
          iconURL: interaction.guild.iconURL() ?? undefined,
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      // Mod log
      const logChannelId = process.env.MOD_LOG_CHANNEL_ID;
      if (logChannelId) {
        const logChannel = interaction.guild.channels.cache.get(logChannelId);
        if (logChannel?.isTextBased()) {
          const logEmbed = new EmbedBuilder()
            .setAuthor({
              name: `Moderation - ${interaction.client.user.username} - Mod Log - Clear`,
              iconURL: interaction.client.user.displayAvatarURL() ?? undefined,
            })
            .addFields(
              { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
              { name: 'Channel', value: `${channel}`, inline: true },
              { name: 'Messages Deleted', value: `${messages.size}`, inline: true },
              {
                name: `${Emojis.date} Date`,
                value: `${moment.utc(interaction.createdAt).format('DD/MM/YYYY HH:mm:ss')}`,
                inline: true,
              },
            )
            .setColor(Constants.COLORS.primary)
            .setFooter({
              text: `Bulk Delete • ${interaction.guild.name}`,
              iconURL: interaction.guild.iconURL() ?? undefined,
            })
            .setTimestamp();

          await logChannel.send({ embeds: [logEmbed] });
        }
      }
    } catch (error) {
      await interaction.reply({
        content: `${Emojis.x} Messages older than **14 days** cannot be deleted.'`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      console.log(error);
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default ClearMessages;
