import type { UserContextMenuCommandInteraction } from 'discord.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } from 'discord.js';
import { Constants } from '../../../config/constants';
import BaseUserContextCommand from '../../../interfaces/commands/BaseUserContextCommand';

class GetAvatarContextCommand extends BaseUserContextCommand {
  constructor() {
    super();
    this.setName('Avatar');
  }

  async execute(interaction: UserContextMenuCommandInteraction): Promise<void> {
    const user = interaction.targetUser ?? interaction.user;
    const member = interaction.guild?.members.cache.get(user.id);

    const avatarDynamic = user.displayAvatarURL({ size: 4096 });
    const banner = await member?.fetch().then((u) => u.bannerURL({ size: 4096 }) ?? null);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${user.username}`,
        iconURL: avatarDynamic,
      })
      .setColor(Constants.COLORS.primary)
      .setImage(avatarDynamic)
      .setFooter({ text: `Requested by ${interaction.user.tag}` });

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setLabel('Download').setStyle(ButtonStyle.Link).setURL(avatarDynamic),
    );

    if (banner) {
      embed.addFields({ name: 'Banner', value: banner });
    }

    await interaction.reply({
      embeds: [embed],
      components: [buttons],
      flags: MessageFlags.Ephemeral,
    });
  }
}

// noinspection JSUnusedGlobalSymbols
export default GetAvatarContextCommand;
