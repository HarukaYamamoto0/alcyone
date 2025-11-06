import type { ChatInputCommandInteraction, SlashCommandStringOption } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import { API } from '../../../config/api';
import Emojis from '../../../config/Emojis';
import { Constants } from '../../../config/constants';
import BaseSlashCommand from '../../../interfaces/commands/BaseSlashCommand';

class AnimeInfo extends BaseSlashCommand {
  constructor() {
    super();
    this.setName('animeinfo');
    this.setCategory('Information');
    this.setDescription(`Shows detailed information of an anime by name`);
    this.data.addStringOption((option: SlashCommandStringOption) =>
      option.setName('anime').setDescription('Anime name to search').setRequired(true),
    );
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
          content: `${Emojis.x} I didn't find any anime with the name **${animeName}**.`,
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
        content: `${Emojis.x} An error occurred while retrieving information about**${animeName}**.`,
      });
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default AnimeInfo;
