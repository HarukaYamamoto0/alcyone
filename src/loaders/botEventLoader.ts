import { readdirSync } from 'node:fs';
import type { BaseBotEvent } from '../interfaces/BaseBotEvent';
import type AlcyoneClient from '../core/Client';

/**
 * Loads and registers event files from a specified directory into the Discord client.
 *
 * @param client - The Discord.js client instance
 * @param path - The directory path where event files are located
 */
export async function botEventLoader(client: AlcyoneClient, path: URL | null = null): Promise<string[]> {
  const eventsPath = path ?? new URL('../events/', import.meta.url);

  const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const { default: Event } = await import(new URL(file, eventsPath).href);
    const event: BaseBotEvent = new Event();

    if (event.once) {
      client.once(event.eventType, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.eventType, (...args) => event.execute(client, ...args));
    }
  }

  return eventFiles;
}
