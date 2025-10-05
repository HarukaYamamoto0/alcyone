import { z } from 'zod';
import { hexKey, sentryDns } from './validators.js';

export const IntegrationEnvSchema = z.object({
  SENTRY_DNS: sentryDns,
  WEATHER_API_KEY: hexKey,
});
