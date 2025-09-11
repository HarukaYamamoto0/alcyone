import type { Interaction } from 'discord.js';
import { Events, MessageFlagsBitField } from 'discord.js';
import type { BaseBotEvent } from '../interfaces/BaseBotEvent';
import type { AlcyoneClient } from '../core/Client';

class InteractionCreateEvent implements BaseBotEvent<'interactionCreate'> {
  public eventType = Events.InteractionCreate as const;
  public once = false;

  async execute(alcyoneClient: AlcyoneClient, interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = alcyoneClient.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          flags: MessageFlagsBitField.Flags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          flags: MessageFlagsBitField.Flags.Ephemeral,
        });
      }
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default InteractionCreateEvent;
