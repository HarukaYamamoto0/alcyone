import type { ChatInputCommandInteraction } from 'discord.js';
import { ChannelType, EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import moment from 'moment';
import 'moment/locale/en-gb';
import BaseCommand from '../../interfaces/BaseCommand';

class ServerInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('serverinfo');
    this.setDescription('📊 Shows detailed information about this server');
    this.addStringOption((option) =>
      option.setName('id').setDescription('Optional server ID to fetch').setRequired(false),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const serverId = interaction.options.getString('id');
    let guild = interaction.guild;

    if (serverId) {
      guild = interaction.client.guilds.cache.get(serverId) || null;
    }

    if (!guild) {
      await interaction.reply({
        content: '❌ Could not find the specified server or you are not in it.',
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
      return;
    }

    const owner = await guild.fetchOwner();

    // Channel counts
    const textChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size;
    const voiceChannels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;
    const categories = guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size;

    // Member counts
    const humans = guild.members.cache.filter((m) => !m.user.bot).size;
    const bots = guild.members.cache.filter((m) => m.user.bot).size;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Server Info - ${guild.name}`, iconURL: guild.iconURL() ?? undefined })
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '🖥️ Server', value: `**${guild.name}**\nID: \`${guild.id}\``, inline: true },
        { name: '👑 Owner', value: `**${owner.user.tag}**\nID: \`${owner.id}\``, inline: true },
        {
          name: '📅 Created On',
          value: `${moment.utc(guild.createdAt).format('DD/MM/YYYY')} (${moment(guild.createdAt).fromNow()})`,
          inline: true,
        },
        {
          name: `👥 Members (${guild.memberCount})`,
          value: `Humans: **${humans}**\nBots: **${bots}**`,
          inline: true,
        },
        {
          name: `📚 Channels (${guild.channels.cache.size})`,
          value: `Text: **${textChannels}**\nVoice: **${voiceChannels}**\nCategories: **${categories}**`,
          inline: true,
        },
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor(0xf3f3f3);

    await interaction.reply({ embeds: [embed] });
  }
}

export default ServerInfo;
