import type { ChatInputCommandInteraction, SlashCommandStringOption } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import { Constants } from '../../../config/constants';
import Emojis from '../../../config/Emojis';
import BaseSlashCommand from '../../../interfaces/commands/BaseSlashCommand';

class MangaInfo extends BaseSlashCommand {
  constructor() {
    super();
    this.setName('mangainfo');
    this.setDescription(`${Emojis.book} Shows detailed information about a manga by name`);
    this.data.addStringOption((option: SlashCommandStringOption) =>
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
          content: `${Emojis.x} No manga found with the name **${mangaName}**.`,
        });
        return;
      }

      const manga = data[0].attributes;

      const embed = new EmbedBuilder()
        .setTitle(`${Emojis.book} Manga Info: ${manga.titles?.en || manga.titles?.en_jp || manga.slug}`)
        .setDescription(manga.synopsis ? manga.synopsis.slice(0, 1000) : 'No synopsis available.')
        .setColor(Constants.COLORS.primary)
        .setThumbnail(manga.posterImage?.original || null)
        .addFields(
          {
            name: `${Emojis.star} Rating`,
            value: manga.averageRating ? `${manga.averageRating}%` : 'N/A',
            inline: true,
          },
          { name: `${Emojis.books} Type`, value: manga.subtype || 'Unknown', inline: true },
          { name: `${Emojis.book} Chapters`, value: manga.chapterCount?.toString() || '???', inline: true },
          { name: `${Emojis.package} Volumes`, value: manga.volumeCount?.toString() || '???', inline: true },
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
        content: `${Emojis.x} An error occurred while searching for **${mangaName}**.`,
      });
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default MangaInfo;
