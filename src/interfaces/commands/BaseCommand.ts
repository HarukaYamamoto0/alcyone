import type {
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  MessageContextMenuCommandInteraction,
} from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

export abstract class BaseCommand {
  public data!: SlashCommandBuilder | ContextMenuCommandBuilder;

  protected constructor() {
    this._category = 'Uncategorized';
    this._devOnly = false;
    this._guildOnly = true;
    this._name = '';
  }

  private _name: string;
  get name() {
    return this._name;
  }

  private _category: string;
  get category() {
    return this._category;
  }

  private _devOnly: boolean;
  get devOnly() {
    return this._devOnly;
  }

  private _guildOnly: boolean;
  get guildOnly() {
    return this._guildOnly;
  }

  abstract execute(
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction | MessageContextMenuCommandInteraction,
  ): Promise<void | unknown>;

  abstract register(): unknown;

  setName(name: string): BaseCommand {
    this._name = name;
    this.data?.setName?.(name);
    return this;
  }

  setDescription(description: string): BaseCommand {
    if (this.data instanceof SlashCommandBuilder) {
      this.data.setDescription(description);
    }
    return this;
  }

  setCategory(category: string): BaseCommand {
    this._category = category;
    return this;
  }

  setDevOnly(choice = false): BaseCommand {
    this._devOnly = choice;
    return this;
  }

  setGuildOnly(choice = true): BaseCommand {
    this._guildOnly = choice;
    return this;
  }
}
