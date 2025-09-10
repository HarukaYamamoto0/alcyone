import {AlcyoneClient} from "./core/Client";
import {commandLoader} from "./loaders/commandLoader";
import {botEventLoader} from "./loaders/botEventLoader";
import registerSlashCommands from "./loaders/slashCommandRegister";

const client = new AlcyoneClient()

const commands = await commandLoader()
client.commands = commands
await botEventLoader(client)
await registerSlashCommands(client)

await client.connect()
console.log("[INDEX] - index successfully loaded");