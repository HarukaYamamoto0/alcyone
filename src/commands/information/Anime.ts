import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import BaseCommand from '../../interfaces/BaseCommand';
import { API } from '../../config/api';
import { Emojis } from '../../config/emojis';
import { Constants } from '../../config/constants';

class AnimeInfo extends BaseCommand {
  constructor() {
    super();
    this.setName('animeinfo');
    this.category = 'Information';
    this.setDescription(`[${this.category}] Shows detailed information of an anime by name`);
    this.addStringOption((option) => option.setName('anime').setDescription('Anime name to search').setRequired(true));
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const animeName = interaction.options.getString('anime', true);

    // Initial loading message
    await interaction.deferReply();

    try {
      const response = await axios.get(API.ANIME.BASE_URL, {
        params: { 'filter[text]': animeName },
      });

      const data = response.data.data;
      if (!data || data.length === 0) {
        await interaction.editReply({
          content: `${Emojis.error} I didn't find any anime with the name **${animeName}**.`,
        });
        return;
      }

      const anime = data[0].attributes;

      const embed = new EmbedBuilder()
        .setTitle(`${Emojis.crossed_flags} Anime Info: ${anime.titles?.en || anime.titles?.en_jp || anime.slug}`)
        .setDescription(anime.synopsis ? anime.synopsis.slice(0, 1000) : 'No synopsis available.')
        .setColor(Constants.COLORS.primary)
        .setThumbnail(anime.posterImage?.original || null)
        .addFields(
          { name: `${Emojis.tv} Type`, value: anime.subtype || 'Unknown', inline: true },
          {
            name: `${Emojis.star} Reviews`,
            value: anime.averageRating ? `${anime.averageRating}%` : 'N/A',
            inline: true,
          },
          { name: `${Emojis.clapper} Episodes`, value: anime.episodeCount?.toString() || 'In progress', inline: true },
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
        content: `${Emojis.error} An error occurred while retrieving information about**${animeName}**.`,
      });
    }
  }
}

export default AnimeInfo;
