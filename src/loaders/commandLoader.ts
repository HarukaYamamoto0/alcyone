import {Collection} from 'discord.js';
import {readdirSync} from 'node:fs';
import BaseCommand from '../interfaces/BaseCommand';

/**
 * Loads and registers command files from a specified directory into a collection.
 *
 * @param {URL | null} path - The directory path where command files are located. If null, defaults to "../commands/" relative to the current module.
 * @return {Promise<Collection<string, BaseCommand>>} A promise that resolves to a collection of command names mapped to their respective command objects.
 */
async function commandLoader(path: URL | null = null): Promise<Collection<string, BaseCommand>> {
    const commands = new Collection<string, BaseCommand>();
    const commandsPath = path ?? new URL("../commands/", import.meta.url);

    const commandFiles = readdirSync(commandsPath)
        .filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const {default: Command} = await import(`${commandsPath.href}/${file}`)
        const command = new Command() as BaseCommand;

        if ('execute' in command) {
            commands.set(command.name, command);
        } else {
            console.warn(`[WARNING] The command at ${file} is missing required "data" or "execute" property.`);
        }
    }

    return commands;
}

export {commandLoader}