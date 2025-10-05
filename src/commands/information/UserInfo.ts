import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import moment from 'moment';
import 'moment/locale/en-gb';
import BaseCommand from '../../interfaces/BaseCommand';
import { Constants } from '../../config/constants';
import { Emojis, statusMap, userBadgesMap } from '../../config/emojis';

class UserInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('userinfo');
    this.setDescription(`${Emojis.bust_in_silhouette}️ Shows detailed information about a user`);
    this.addUserOption((option) => option.setName('user').setDescription('The user to get information about'));
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild?.members.fetch(user.id).catch(() => null);

    const badges = user.flags
      ? user.flags
          .toArray()
          .map((flag) => userBadgesMap[flag] || '')
          .join(' ')
      : '';

    const status = member?.presence?.status ? statusMap[member.presence.status] : '⚫ Offline';

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(user.displayAvatarURL({ size: 512 }))
      .setColor(Constants.COLORS.primary)
      .addFields(
        { name: `${Emojis.id}️ User ID`, value: `\`${user.id}\``, inline: true },
        { name: `${Emojis.label}️ Nickname`, value: member?.nickname || '—', inline: true },
        { name: `${Emojis.performing_arts}️ Badges`, value: badges || 'None', inline: true },
        { name: `${Emojis.satellite}️ Status`, value: status, inline: true },
        {
          name: `${Emojis.date}️ Account Created`,
          value: `${moment.utc(user.createdAt).format('DD/MM/YYYY')} (${moment(user.createdAt).fromNow()})`,
          inline: true,
        },
      );

    if (member) {
      embed.addFields({
        name: `${Emojis.inbox_tray} Joined Server`,
        value: `${moment.utc(member.joinedAt).format('DD/MM/YYYY')} (${moment(member.joinedAt).fromNow()})`,
        inline: true,
      });

      if (member.premiumSince) {
        embed.addFields({
          name: `${Emojis.rocket} Boosting Since`,
          value: `${moment.utc(member.premiumSince).format('DD/MM/YYYY')} (${moment(member.premiumSince).fromNow()})`,
          inline: true,
        });
      }
    }

    embed.setFooter({
      text: `Requested by ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    });
    embed.setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}

export default UserInfo;
