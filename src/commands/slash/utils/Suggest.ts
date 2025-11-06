import type { ChatInputCommandInteraction, EmojiIdentifierResolvable, SlashCommandStringOption } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import { Constants } from '../../../config/constants';
import Emojis from '../../../config/Emojis';
import BaseSlashCommand from '../../../interfaces/commands/BaseSlashCommand';

class Suggest extends BaseSlashCommand {
  constructor() {
    super();
    this.setName('suggest');
    this.setDescription(`Submit a suggestion to the server`);
    this.data.addStringOption((option: SlashCommandStringOption) =>
      option
        .setName('message')
        .setDescription('The suggestion content (max 1000 characters)')
        .setMaxLength(1000)
        .setRequired(true),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const serverId = process.env.SERVER_ID;
    const suggestChannelId = process.env.SUGGESTION_CHANNEL_ID;

    if (!serverId || !suggestChannelId) {
      await interaction.reply({
        content: `${Emojis.x} | No suggestion channel has been configured in the environment.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const guild = await interaction.client.guilds.fetch(serverId);

    if (!guild) {
      await interaction.reply({
        content: `${Emojis.x} | I couldn't find the server. Please check the server ID in the environment variables.`,
      });
      return;
    }

    const channel = guild.channels.cache.get(suggestChannelId);

    if (!channel || !channel.isTextBased()) {
      await interaction.reply({
        content: `${Emojis.x} | The configured suggestion channel does not exist or is not a text channel.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const content = interaction.options.getString('message', true);

    const embed = new EmbedBuilder()
      .setTitle(`${Emojis.bulb} New Suggestion`)
      .setColor(Constants.COLORS.primary)
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields(
        { name: `${Emojis.person} Author`, value: `${interaction.user}`, inline: true },
        { name: `${Emojis.pencil} Suggestion`, value: content },
      )
      .setFooter({ text: `Author ID: ${interaction.user.id}` })
      .setTimestamp();

    const msg = await channel.send({ embeds: [embed] });

    try {
      await msg.react(Emojis.thumbsup as EmojiIdentifierResolvable);
      await msg.react(Emojis.thumbsdown as EmojiIdentifierResolvable);
    } catch (e) {
      console.log(e);
      // TODO: bot might not have Add Reactions permission
    }

    await interaction.reply({
      content: `${Emojis.check_mark} | ${interaction.user}, your suggestion has been successfully submitted!`,
      flags: MessageFlagsBitField.Flags.Ephemeral,
    });
  }
}

// noinspection JSUnusedGlobalSymbols
export default Suggest;
