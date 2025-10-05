import type { HexColorString } from 'discord.js';

/**
 * A collection of constants used throughout the application.
 * Contains public information about bot details, version, support and color settings, etc.
 */
export const Constants = {
  BOT_NAME: 'Alcyone',
  VERSION: '1.0.0',
  SUPPORT_SERVER: 'https://discord.gg/pW7JUjDDZm',
  INTENTS: 53608447, // https://harukayamamoto0.github.io/discord-intents-calc/
  COLORS: {
    primary: '#596691' as HexColorString,
    success: '#3fb11a' as HexColorString,
    error: '#ac2222' as HexColorString,
    warning: '#EAB61EFF' as HexColorString,
  },
};
