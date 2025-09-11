import { AlcyoneClient } from './core/Client';
import { botEventLoader } from './loaders/botEventLoader';
import { commandLoader } from './loaders/commandLoader';
import registerSlashCommands from './loaders/slashCommandRegister';

const client = new AlcyoneClient();

const commands = await commandLoader();
client.commands = commands;
await botEventLoader(client);
await registerSlashCommands(commands);

await client.connect();
console.log('[INDEX] - index successfully loaded');
