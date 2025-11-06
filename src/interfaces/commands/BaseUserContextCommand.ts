import type { UserContextMenuCommandInteraction } from 'discord.js';
import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { BaseCommand } from './BaseCommand';

abstract class BaseUserContextCommand extends BaseCommand {
  public data: ContextMenuCommandBuilder;

  protected constructor() {
    super();
    this.data = new ContextMenuCommandBuilder().setType(ApplicationCommandType.User);
  }

  abstract execute(interaction: UserContextMenuCommandInteraction): Promise<void | unknown>;

  register() {
    return this.data.toJSON();
  }
}

export default BaseUserContextCommand;
