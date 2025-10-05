import type { ChatInputCommandInteraction } from 'discord.js';
import { EmbedBuilder, MessageFlagsBitField } from 'discord.js';
import BaseCommand from '../../interfaces/BaseCommand';
import type { WeatherAPIResponse } from '../../interfaces/WeatherAPIResponse';
import axios from 'axios';
import { API } from '../../config/api';
import { Emojis } from '../../config/emojis';
import { Constants } from '../../config/constants';

class Climate extends BaseCommand {
  constructor() {
    super();
    this.setName('climate');
    this.setDescription(`${Emojis.white_sun_small_cloud} Shows the current climate and 3-day forecast of a location`);
    this.addStringOption((option) =>
      option.setName('local').setDescription('City or location to search for the weather').setRequired(true),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const location = interaction.options.getString('local', true);

    try {
      // TODO: Cache the API response
      const response = await axios.get<WeatherAPIResponse>(API.WEATHER.BASE_URL, {
        params: {
          key: API.WEATHER.KEY,
          q: location,
          lang: 'pt',
          days: 3,
          aqi: 'no',
          alerts: 'no',
        },
      });

      const data = response.data;
      const current = data.current;
      const locationData = data.location;
      const forecastDays = data.forecast.forecastday;

      // Embed principal
      const embed = new EmbedBuilder()
        .setTitle(`${Emojis.white_sun_small_cloud} Weather in ${locationData.name}, ${locationData.region}`)
        .setDescription(`**Current condition:** ${current.condition.text}`)
        .addFields(
          { name: 'Temperature', value: `${current.temp_c}°C`, inline: true },
          { name: 'Thermal Sensation', value: `${current.feelslike_c}°C`, inline: true },
          { name: 'Humidity', value: `${current.humidity}%`, inline: true },
          { name: 'Wind', value: `${current.wind_kph} km/h`, inline: true },
          { name: 'Last Update', value: current.last_updated, inline: true },
        )
        .setThumbnail(`https:${current.condition.icon}`)
        .setColor(Constants.COLORS.primary)
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      forecastDays.forEach((day) => {
        embed.addFields({
          name: `${Emojis.date} ${day.date}`,
          value: `🌡️ ${day.day.avgtemp_c}°C | Condition: ${day.day.condition.text}`,
          inline: true,
        });
      });

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `${Emojis.error} This city could not be found or an API error occurred.`,
        flags: MessageFlagsBitField.Flags.Ephemeral,
      });
    }
  }
}

export default Climate;
