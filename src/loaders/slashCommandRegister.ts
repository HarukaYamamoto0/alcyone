import {Collection, REST, Routes} from 'discord.js';
import BaseCommand from "../interfaces/BaseCommand";

/**
 * Registers and updates the slash commands for the application using the provided commands collection.
 *
 * @param {Collection<string, BaseCommand>} commands - A collection of commands to be registered, where the key is the command name and the value is the command data.
 * @return {Promise<void>} A promise that resolves once the slash commands have been registered or updated successfully.
 */
async function registerSlashCommands(commands: Collection<string, BaseCommand>): Promise<void> {
    try {
        if (!process.env.BOT_TOKEN) {
            console.error('No BOT_TOKEN environment variable found.');
            return;
        }
        const rest = new REST().setToken(process.env.BOT_TOKEN);

        console.log('Started refreshing application (/) commands.');

        if (!process.env.CLIENT_ID) {
            console.error('No CLIENT_ID environment variable found.');
            return;
        }
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: Array.from(commands.values()).map(command => command.toJSON())}
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing application (/) commands:');
        console.error(error);
    }
}

export default registerSlashCommands