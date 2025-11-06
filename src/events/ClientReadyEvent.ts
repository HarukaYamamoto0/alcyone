import type { BaseBotEvent } from '../interfaces/BaseBotEvent';
import type { Client } from 'discord.js';
import { Events } from 'discord.js';
import type AlcyoneClient from '../core/Client';

class ClientReadyEvent implements BaseBotEvent<'clientReady'> {
  public eventType = Events.ClientReady as const;
  public once = true;

  public execute(alcyoneClient: AlcyoneClient, client: Client<true>): void {
    console.log(`[EVENT] Ready! Logged in as ${client.user.tag}`);
  }
}

// noinspection JSUnusedGlobalSymbols
export default ClientReadyEvent;
