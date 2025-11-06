import type BaseMessageContextCommand from './commands/BaseMessageContextCommand';
import type BaseSlashCommand from './commands/BaseSlashCommand';
import type BaseUserContextCommand from './commands/BaseUserContextCommand';
import type { BaseCommand } from './commands/BaseCommand';

/**
 * Represents a record of a command, including its name, path, and instance.
 *
 * @template T Extends the BaseCommand type to specify the command type.
 * @property {string} name The name of the command.
 * @property {string} path The path associated with the command.
 * @property {T} instance The instance of the command.
 */
export interface CommandRecord<T extends BaseCommand> {
  name: string;
  path: string;
  instance: T;
}

/**
 * Interface representing a collection of loaded commands categorized by their type.
 *
 * This structure is used to store and retrieve commands based on the interaction type.
 * Commands are grouped into three main categories: slash commands, user context commands,
 * and message context commands. Each command type is stored in a Map for efficient access,
 * while `categories` provides an array of strings representing command categories.
 */
export interface LoadedCommands {
  slash: Map<string, CommandRecord<BaseSlashCommand>>;
  user: Map<string, CommandRecord<BaseUserContextCommand>>;
  message: Map<string, CommandRecord<BaseMessageContextCommand>>;
  categories: string[];
}
