import { z } from 'zod';
import { discordToken, snowflake } from './validators.js';

export const BaseEnvSchema = z.object({
  BOT_TOKEN: discordToken,
  CLIENT_ID: snowflake,
  SERVER_ID: snowflake,
  LOG_CHANNEL_ID: snowflake.optional(),
});
