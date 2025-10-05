import type { Interaction } from 'discord.js';
import { Events, MessageFlags } from 'discord.js';
import type { BaseBotEvent } from '../interfaces/BaseBotEvent';
import commands from '../commands/commands.generated';

const commandMap = new Map(commands.map((cmd) => [cmd.name, cmd]));

class InteractionCreateEvent implements BaseBotEvent<'interactionCreate'> {
  public eventType = Events.InteractionCreate as const;
  public once = false;

  async execute(_: unknown, interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = commandMap.get(interaction.commandName);

    if (!command) {
      console.warn(`[InteractionCreateEvent] - Command "${interaction.commandName}" not found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`[CommandError] ${interaction.commandName}`, error);

      const errorPayload = {
        content: '⚠️ There was an unexpected error while executing this command.',
        flags: MessageFlags.Ephemeral,
      } as const;

      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorPayload);
        } else {
          await interaction.reply(errorPayload);
        }
      } catch (sendError) {
        console.error(
          `[InteractionCreateEvent] - Failed to send error response for ${interaction.commandName}`,
          sendError,
        );
      }
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default InteractionCreateEvent;
