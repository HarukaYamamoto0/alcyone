import { Env } from './env';

export const API = {
  ANIME: {
    BASE_URL: 'https://kitsu.io/api/edge/anime',
  },
  WEATHER: {
    BASE_URL: 'https://api.weatherapi.com/v1/forecast.json',
    KEY: Env.WEATHER_API_KEY,
  },
};
