import { BaseCommand } from './BaseCommand';
import type { ChatInputCommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

abstract class BaseSlashCommand extends BaseCommand {
  public data: SlashCommandBuilder;

  protected constructor() {
    super();
    this.data = new SlashCommandBuilder();
  }

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void | unknown>;

  register(): RESTPostAPIApplicationCommandsJSONBody {
    return this.data.toJSON();
  }
}

export default BaseSlashCommand;
