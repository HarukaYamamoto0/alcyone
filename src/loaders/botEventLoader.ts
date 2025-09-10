import {Client} from 'discord.js';
import {readdirSync} from 'node:fs';

/**
 * Loads and registers event files from a specified directory into the Discord client.
 *
 * @param {Client} client - The Discord.js client instance to register events
 * @param {URL | null} path - The directory path where event files are located. If null, defaults to "../events/" relative to the current module.
 * @return {Promise<string[]>} A promise that when resolved returns the names of the events that were loaded
 */
async function botEventLoader(client: Client, path: URL | null = null): Promise<string[]> {
    const eventsPath = path ?? new URL("../events/", import.meta.url);

    const eventFiles = readdirSync(eventsPath)
        .filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const {default: Event} = await import(`${eventsPath.href}/${file}`)
        const event = new Event();

        if ('execute' in event) {
            if (event.once) {
                client.once(event.eventType, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.eventType, (...args) => event.execute(client, ...args));
            }
        } else {
            console.warn(`[WARNING] The event at ${file} is missing required "execute" property.`);
        }
    }
    return eventFiles
}

export {botEventLoader}