import { z } from 'zod';
import { discordToken, snowflake } from './validators.js';

export const BaseEnvSchema = z.object({
  BOT_TOKEN: discordToken,
  CLIENT_ID: snowflake,
  SERVER_ID: snowflake,
  LOG_CHANNEL_ID: snowflake.optional(),
  DEV_GUILD_ID: snowflake.optional(),
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
});
