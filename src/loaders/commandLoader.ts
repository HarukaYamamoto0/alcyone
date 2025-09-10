import {Collection} from 'discord.js';
import {readdirSync} from 'node:fs';
import BaseCommand from '../interfaces/BaseCommand';
import {fileURLToPath} from "node:url";

/**
 * Loads and registers command files from a specified directory into a collection.
 *
 * @param {URL | null} path - The directory path where command files are located. If null, defaults to "../commands/" relative to the current module.
 * @return {Promise<Collection<string, BaseCommand>>} A promise that resolves to a collection of command names mapped to their respective command objects.
 */
async function commandLoader(path: URL | null = null): Promise<Collection<string, BaseCommand>> {
    const commands = new Collection<string, BaseCommand>();
    const commandsPath = path ?? new URL("../commands/", import.meta.url);

    const categoryNames = readdirSync(fileURLToPath(commandsPath));

    for (const category of categoryNames) {
        const categoryPath = new URL(category + "/", commandsPath);

        const commandFiles = readdirSync(fileURLToPath(categoryPath))
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = new URL(file, categoryPath);
            const {default: Command} = await import(filePath.href)

            const command = new Command() as BaseCommand;
            command.category = category;

            if ('execute' in command) {
                commands.set(command.name, command);
            } else {
                console.warn(`[WARNING] The command at ${file} is missing required "data" or "execute" property.`);
            }
        }
    }

    return commands;
}

export {commandLoader}