import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';

class Invite extends BaseCommand {
  constructor() {
    super();
    this.setName('invite').setDescription('📩 Get the bot invite link and server support info');
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const inviteEmbed = new EmbedBuilder()
      .setTitle('📩 Add me to your server!')
      .setDescription(
        '**Thank you for wanting to invite me!**\n\n' +
          '🔗 [Click here to add the bot](https://discord.com/oauth2/authorize?client_id=1411920581066100919&scope=bot&permissions=2147483647)\n\n' +
          '💬 Need help or want to report bugs? [Join the Support Server](https://discord.gg/pW7JUjDDZm)',
      )
      .setColor(0x00bfff)
      .setThumbnail('https://cdn.discordapp.com/attachments/773715544599298070/1411920581066100919/aqinvite.png')
      .setFooter({ text: '⚡ Fast, friendly, and always online!' });

    await interaction.reply({ embeds: [inviteEmbed] });
  }
}

export default Invite;
