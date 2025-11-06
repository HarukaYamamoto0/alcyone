import type { ClientOptions } from 'discord.js';
import { Client } from 'discord.js';
import { Constants } from '../config/constants';
import type { LoadedCommands } from '../interfaces/LoadedCommands';

/**
 * AlcyoneClient extends the Client class and provides functionality
 * for handling bot commands, both slash-based and context menu types.
 * This class initializes with a predefined set of commands and allows
 * for connection to the Discord gateway using a specified bot token.
 */
class AlcyoneClient extends Client {
  /**
   * Represents the loaded commands for the application.
   * Maintains a collection of commands organized by type and categories.
   */
  public commands: LoadedCommands = {
    slash: new Map(),
    user: new Map(),
    message: new Map(),
    categories: [],
  };

  constructor(options: ClientOptions = { intents: Constants.INTENTS }) {
    super(options);
  }

  /**
   * Establishes a connection using the provided token or a default environment token.
   *
   * @param {string|null} [token=null] - The token used to authenticate the connection. If not provided, the default
   * token from the environment variable BOT_TOKEN is used.
   * @return {Promise<void>} A promise that resolves once the connection has been successfully established.
   */
  async connect(token: string | null = null): Promise<void> {
    const hasToken = token ?? process.env.BOT_TOKEN;
    await super.login(hasToken);
  }
}

export default AlcyoneClient;
