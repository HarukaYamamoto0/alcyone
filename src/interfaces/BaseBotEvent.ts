import {Events} from 'discord.js';
import {AlcyoneClient} from "../core/Client";

/**
 * Represents the base structure for a bot event. This interface defines the
 * core properties and behavior that any event in the system should implement.
 */
interface BaseBotEvent {
    eventType: Events;
    once: boolean;
    execute: (client: AlcyoneClient, ...args: any[]) => Promise<void>;
}

export {BaseBotEvent}