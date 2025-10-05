import { REST, Routes } from 'discord.js';
import type BaseCommand from '../interfaces/BaseCommand';
import { Env } from '../config/env';

/**
 * Registers and updates the slash commands for the application using the provided commands array.
 *
 * @param {BaseCommand[]} commands - An array of command instances to be registered.
 * @return {Promise<void>} A promise that resolves once the slash commands have been registered or updated successfully.
 */
async function registerSlashCommands(commands: BaseCommand[]): Promise<void> {
  try {
    const { BOT_TOKEN, CLIENT_ID } = Env;

    if (!BOT_TOKEN) {
      console.error('❌ No BOT_TOKEN environment variable found.');
      return;
    }

    if (!CLIENT_ID) {
      console.error('❌ No CLIENT_ID environment variable found.');
      return;
    }

    const rest = new REST().setToken(BOT_TOKEN);

    console.log('🔄 Started refreshing application (/) commands...');

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands.map((command) => command.toJSON()),
    });

    console.log(`✅ Successfully reloaded ${commands.length} application (/) commands.`);
  } catch (error) {
    console.error('❌ Error refreshing application (/) commands:');
    console.error(error);
  }
}

export default registerSlashCommands;
