import type { ClientOptions } from 'discord.js';
import { Client, Collection, IntentsBitField } from 'discord.js';
import type BaseCommand from '../interfaces/BaseCommand';

/**
 * Represents a specialized extension of the Client class, designed for handling commands and bot functionality.
 */
class AlcyoneClient extends Client {
  /**
   * A collection of command objects, where each command is identified by a unique string key.
   *
   * The collection maps string keys to instances of the `BaseCommand` class or its derived types.
   * It is commonly used to organize and access commands within an application.
   *
   * @type {Collection<string, BaseCommand>}
   */
  public commands: Collection<string, BaseCommand>;

  /**
   * Creates an instance of the class with specified client options.
   *
   * @param {ClientOptions} [options={intents: IntentsBitField.Flags.Guilds}] - The options to configure the client,
   * defaulting to guild intents.
   */
  constructor(options: ClientOptions = { intents: IntentsBitField.Flags.Guilds }) {
    super(options);
    this.commands = new Collection();
  }

  /**
   * Establishes a connection using the provided token or a default token from the environment variables.
   *
   * @param {string|null} token - The authentication token. The default is the `BOT_TOKEN` environment variable.
   * @return {Promise<void>} A promise that resolves when the connection is successfully established.
   */
  async connect(token: string | null = null): Promise<void> {
    const hasToken = token ?? process.env.BOT_TOKEN;
    await super.login(hasToken);
  }
}

export { AlcyoneClient };
