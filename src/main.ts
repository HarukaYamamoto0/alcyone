import AlcyoneClient from './core/Client';
import { botEventLoader } from './loaders/botEventLoader';
import commandRegister from './loaders/commandRegister';
import { loadAllCommands } from './loaders/loadAllCommands';

const client = new AlcyoneClient();
client.commands = await loadAllCommands();

await commandRegister(client.commands);
await botEventLoader(client);

await client.connect();
console.log('[INDEX] - index successfully loaded');
