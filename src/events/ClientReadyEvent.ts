import {Events} from "discord.js";
import {BaseBotEvent} from "../interfaces/BaseBotEvent";
import {AlcyoneClient} from "../core/Client";

class ClientReadyEvent implements BaseBotEvent {
    public eventType = Events.ClientReady;
    public once = true;

    public async execute(client: AlcyoneClient): Promise<void> {
        console.log(`[EVENT] - Ready! Logged in as ${client.user?.tag}`);
    }
}

// noinspection JSUnusedGlobalSymbols
export default ClientReadyEvent