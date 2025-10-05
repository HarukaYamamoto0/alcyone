import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import { Emojis } from '../../config/emojis';
import { Constants } from '../../config/constants';

class Invite extends BaseCommand {
  constructor() {
    super();
    this.setName('invite').setDescription(
      `${Emojis.envelope_with_arrow} Get the bot invite link and server support info`,
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const inviteEmbed = new EmbedBuilder()
      .setTitle(`${Emojis.envelope_with_arrow} Add me to your server!`)
      .setDescription(
        '**Thank you for wanting to invite me!**\n\n' +
          `${Emojis.envelope_with_arrow} [Click here to add the bot](https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&scope=bot&permissions=${Constants.INTENTS})\n\n` +
          `${Emojis.envelope_with_arrow}  Need help or want to report bugs? [Join the Support Server](https://discord.gg/pW7JUjDDZm)`,
      )
      .setColor(Constants.COLORS.primary)
      .setThumbnail('https://cdn.discordapp.com/attachments/773715544599298070/1411920581066100919/aqinvite.png')
      .setFooter({ text: '⚡ Fast, friendly, and always online!' });

    await interaction.reply({ embeds: [inviteEmbed] });
  }
}

export default Invite;
