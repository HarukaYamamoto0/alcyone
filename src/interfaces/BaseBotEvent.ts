import type { ClientEvents } from 'discord.js';
import type AlcyoneClient from '../core/Client';

/**
 * Represents the base structure for a bot event. This interface defines the
 * core properties and behavior that any event in the system should implement.
 */
export interface BaseBotEvent<K extends keyof ClientEvents = keyof ClientEvents> {
  eventType: K;
  once: boolean;
  execute: (client: AlcyoneClient, ...args: ClientEvents[K]) => unknown | Promise<unknown>;
}
