import { AlcyoneClient } from './core/Client';
import { botEventLoader } from './loaders/botEventLoader';
import registerSlashCommands from './loaders/slashCommandRegister';
import commands from './commands/commands.generated';

const client = new AlcyoneClient();

await botEventLoader(client);
await registerSlashCommands(commands);

await client.connect();
console.log('[INDEX] - index successfully loaded');
