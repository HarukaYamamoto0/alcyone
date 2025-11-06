import type AlcyoneClient from '../core/Client';
import BaseSlashCommand from '../interfaces/commands/BaseSlashCommand';
import BaseUserContextCommand from '../interfaces/commands/BaseUserContextCommand';
import BaseMessageContextCommand from '../interfaces/commands/BaseMessageContextCommand';

/**
 * Reloads a command module by its name, forcing re-import of the module with an updated cache-busting identifier.
 * The function checks for the existence of the command, validates the module structure, and ensures the exported
 * class is of the proper command type before replacing the old instance.
 *
 * @param {AlcyoneClient} client The client instance containing the commands registry.
 * @param {string} name The name of the command to reload.
 * @return {Promise<BaseSlashCommand | BaseUserContextCommand | BaseMessageContextCommand | null>}
 *         A promise that resolves to the reloaded command instance
 *         if successful, or null if the command could not be reloaded or found.
 */
async function reloadCommand(
  client: AlcyoneClient,
  name: string,
): Promise<BaseSlashCommand | BaseUserContextCommand | BaseMessageContextCommand | null> {
  const record = client.commands.slash.get(name) ?? client.commands.user.get(name) ?? client.commands.message.get(name);

  if (!record) {
    console.warn(`[reloadCommand] ⚠️ Command "${name}" not found.`);
    return null;
  }

  const { path } = record;

  try {
    // ES modules cache busting - add timestamp to force reload
    const cacheBustedPath = `${path}?update=${Date.now()}`;
    const module = await import(cacheBustedPath);

    // Validate module structure
    if (!module.default) {
      console.error(`[reloadCommand] Module at ${path} does not have a default export`);
      return null;
    }

    const CommandClass = module.default;

    // Validate it's a constructor
    if (typeof CommandClass !== 'function') {
      console.error(`[reloadCommand] Default export of ${path} is not a constructor`);
      return null;
    }

    const instance = new CommandClass();

    // Validate an instance type and store in a correct collection
    if (instance instanceof BaseSlashCommand) {
      client.commands.slash.set(name, { name, path, instance });
    } else if (instance instanceof BaseUserContextCommand) {
      client.commands.user.set(name, { name, path, instance });
    } else if (instance instanceof BaseMessageContextCommand) {
      client.commands.message.set(name, { name, path, instance });
    } else {
      console.error(`[reloadCommand] Instance from ${path} is not a valid command type`);
      return null;
    }

    console.log(`[reloadCommand] ✅ Command "${name}" successfully reloaded.`);
    return instance;
  } catch (error) {
    console.error(`[reloadCommand] ❌ Failed to reload command "${name}":`, error);
    return null;
  }
}

export default reloadCommand;
