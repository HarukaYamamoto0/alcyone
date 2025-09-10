import {REST, Routes} from 'discord.js';
import {AlcyoneClient} from '../core/Client';

async function registerSlashCommands(client: AlcyoneClient): Promise<void> {
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
            {body: Array.from(client.commands.values()).map(command => command.toJSON())}
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error refreshing application (/) commands:');
        console.error(error);
    }
}

export default registerSlashCommands