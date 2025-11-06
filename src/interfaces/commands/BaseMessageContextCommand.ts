import type { MessageContextMenuCommandInteraction } from 'discord.js';
import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { BaseCommand } from './BaseCommand';

abstract class BaseMessageContextCommand extends BaseCommand {
  public data: ContextMenuCommandBuilder;

  protected constructor() {
    super();
    this.data = new ContextMenuCommandBuilder().setType(ApplicationCommandType.Message);
  }

  abstract execute(interaction: MessageContextMenuCommandInteraction): Promise<void | unknown>;

  register() {
    return this.data.toJSON();
  }
}

export default BaseMessageContextCommand;
