import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import BaseCommand from '../../interfaces/BaseCommand';

class MangaInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('mangainfo');
    this.setDescription('📖 Shows detailed information about a manga by name');
    this.addStringOption((option) =>
      option.setName('manga').setDescription('Name of the manga to search').setRequired(true),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const mangaName = interaction.options.getString('manga', true);

    // Prevent timeout
    await interaction.deferReply();

    try {
      const response = await axios.get('https://kitsu.io/api/edge/manga', {
        params: { 'filter[text]': mangaName },
      });

      const data = response.data.data;
      if (!data || data.length === 0) {
        await interaction.editReply({
          content: `❌ No manga found with the name **${mangaName}**.`,
        });
        return;
      }

      const manga = data[0].attributes;

      const embed = new EmbedBuilder()
        .setTitle(`📖 Manga Info: ${manga.titles?.en || manga.titles?.en_jp || manga.slug}`)
        .setDescription(manga.synopsis ? manga.synopsis.slice(0, 1000) : 'No synopsis available.')
        .setColor(0x9b59b6)
        .setThumbnail(manga.posterImage?.original || null)
        .addFields(
          { name: '⭐ Rating', value: manga.averageRating ? `${manga.averageRating}%` : 'N/A', inline: true },
          { name: '📚 Type', value: manga.subtype || 'Unknown', inline: true },
          { name: '📖 Chapters', value: manga.chapterCount?.toString() || '???', inline: true },
          { name: '📦 Volumes', value: manga.volumeCount?.toString() || '???', inline: true },
        )
        .setImage(manga.coverImage?.large || null)
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: `❌ An error occurred while searching for **${mangaName}**.`,
      });
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default MangaInfo;
