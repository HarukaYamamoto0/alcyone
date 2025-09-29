import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import moment from 'moment';
import 'moment/locale/en-gb';
import BaseCommand from '../../interfaces/BaseCommand';

const badgeMap: Record<string, string> = {
  Staff: '🛠️',
  Partner: '🤝',
  Hypesquad: '🎉',
  BugHunterLevel1: '🐞',
  BugHunterLevel2: '🐛',
  HypeSquadOnlineHouse1: '🦁',
  HypeSquadOnlineHouse2: '🧠',
  HypeSquadOnlineHouse3: '⚖️',
  PremiumEarlySupporter: '💎',
  VerifiedBot: '🤖',
  VerifiedDeveloper: '👨‍💻',
};

const statusMap: Record<string, string> = {
  online: '🟢 Online',
  idle: '🌙 Idle',
  dnd: '⛔ Do Not Disturb',
  offline: '⚫ Offline',
};

class UserInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('userinfo');
    this.setDescription('👤 Shows detailed information about a user');
    this.addUserOption((option) => option.setName('user').setDescription('The user to get information about'));
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild?.members.fetch(user.id).catch(() => null);

    const badges = user.flags
      ? user.flags
          .toArray()
          .map((flag) => badgeMap[flag] || '')
          .join(' ')
      : '';

    const status = member?.presence?.status ? statusMap[member.presence.status] : '⚫ Offline';

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(user.displayAvatarURL({ size: 512 }))
      .setColor(member?.premiumSince ? 0xf47fff : 0xffffff)
      .addFields(
        { name: '🆔 User ID', value: `\`${user.id}\``, inline: true },
        { name: '🏷️ Nickname', value: member?.nickname || '—', inline: true },
        { name: '🎭 Badges', value: badges || 'None', inline: true },
        { name: '📡 Status', value: status, inline: true },
        {
          name: '📅 Account Created',
          value: `${moment.utc(user.createdAt).format('DD/MM/YYYY')} (${moment(user.createdAt).fromNow()})`,
          inline: true,
        },
      );

    if (member) {
      embed.addFields({
        name: '📥 Joined Server',
        value: `${moment.utc(member.joinedAt).format('DD/MM/YYYY')} (${moment(member.joinedAt).fromNow()})`,
        inline: true,
      });

      if (member.premiumSince) {
        embed.addFields({
          name: '🚀 Boosting Since',
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

// noinspection JSUnusedGlobalSymbols
export default UserInfo;
