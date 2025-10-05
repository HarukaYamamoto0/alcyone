import { z } from 'zod';

export const snowflake = z.string().regex(/^\d{17,19}$/, 'Invalid Snowflake ID (must be 17-19 digits)');

export const discordToken = z
  .string()
  .min(50, 'Discord token too short')
  .regex(/^[A-Za-z0-9._-]+$/, 'Token with invalid format')
  .refine((t) => t.split('.').length === 3, 'Discord token must have 3 parts separated by period');

export const sentryDns = z
  .url('Sentry DNS must be a valid URL')
  .refine((url) => url.includes('.sentry.io'), 'Must be a Sentry DSN');

export const hexKey = z
  .string()
  .min(16)
  .regex(/^[a-f0-9]+$/i, 'Must contain only hexadecimal characters');
