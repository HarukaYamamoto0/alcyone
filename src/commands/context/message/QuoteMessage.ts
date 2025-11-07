import BaseMessageContextCommand from '../../../interfaces/commands/BaseMessageContextCommand';
import type { MessageContextMenuCommandInteraction } from 'discord.js';
import { EmbedBuilder, hyperlink, MessageFlagsBitField } from 'discord.js';
import { Constants } from '../../../config/constants';

class QuoteMessage extends BaseMessageContextCommand {
  constructor() {
    super();
    this.setName('Quote Message');
  }

  async execute(interaction: MessageContextMenuCommandInteraction) {
    const msg = interaction.targetMessage;
    if (!msg || (!msg.content && msg.attachments.size === 0)) {
      return interaction.reply({
        content: 'Nothing to mention in this message…',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }

    if (!msg.author || msg.author.bot) {
      return interaction.reply({
        content: 'Bots cannot be quoted.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }

    const safeContent = msg.content?.trim().length ? msg.content : '*[no text]*';

    const image = msg.attachments.find((att) => att.contentType?.startsWith('image/'));

    const url = `https://discord.com/channels/${msg.guildId}/${msg.channelId}/${msg.id}`;
    const messageLink = hyperlink('Go to message ↗', url);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: msg.author.tag,
        iconURL: msg.author.displayAvatarURL(),
      })
      .setDescription(`${safeContent}\n\n${messageLink}`)
      .setColor(Constants.COLORS.primary)
      .setFooter({ text: `Quoted by ${interaction.user.tag}` })
      .setTimestamp(msg.createdAt);

    if (image) embed.setImage(image.url);

    await interaction.reply({ embeds: [embed] });
  }
}

// noinspection JSUnusedGlobalSymbols
export default QuoteMessage;
