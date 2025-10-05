import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import BaseCommand from '../../interfaces/BaseCommand';

class AnimeInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('animeinfo');
    this.setDescription('🎌 Shows detailed information of an anime by name');
    this.addStringOption((option) => option.setName('anime').setDescription('Anime name to search').setRequired(true));
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const animeName = interaction.options.getString('anime', true);

    // Initial loading message
    await interaction.deferReply();

    try {
      const response = await axios.get('https://kitsu.io/api/edge/anime', {
        params: { 'filter[text]': animeName },
      });

      const data = response.data.data;
      if (!data || data.length === 0) {
        await interaction.editReply({
          content: `❌ I didn't find any anime with the name **${animeName}**.`,
        });
        return;
      }

      const anime = data[0].attributes;

      const embed = new EmbedBuilder()
        .setTitle(`🎌 Anime Info: ${anime.titles?.en || anime.titles?.en_jp || anime.slug}`)
        .setDescription(anime.synopsis ? anime.synopsis.slice(0, 1000) : 'No synopsis available.')
        .setColor(0x8e44ad)
        .setThumbnail(anime.posterImage?.original || null)
        .addFields(
          { name: '📺 Type', value: anime.subtype || 'Unknown', inline: true },
          { name: '⭐ Reviews', value: anime.averageRating ? `${anime.averageRating}%` : 'N/A', inline: true },
          { name: '🎬 Episodes', value: anime.episodeCount?.toString() || 'In progress', inline: true },
        )
        .setImage(anime.coverImage?.large || null)
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: `❌ An error occurred while retrieving information about**${animeName}**.`,
      });
    }
  }
}

export default AnimeInfo;
