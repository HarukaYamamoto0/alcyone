import type { Interaction } from 'discord.js';
import { Events, MessageFlags } from 'discord.js';
import type { BaseBotEvent } from '../interfaces/BaseBotEvent';
import type AlcyoneClient from '../core/Client';
import safeReply from '../utils/safeReply';

class InteractionCreateEvent implements BaseBotEvent<'interactionCreate'> {
  public eventType = Events.InteractionCreate as const;
  public once = false;

  async execute(client: AlcyoneClient, interaction: Interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const record = client.commands.slash.get(interaction.commandName);
        if (!record) return this.warnMissing(interaction.commandName);
        return await record.instance.execute(interaction);
      }

      if (interaction.isUserContextMenuCommand()) {
        const record = client.commands.user.get(interaction.commandName);
        if (!record) return this.warnMissing(interaction.commandName);
        return await record.instance.execute(interaction);
      }

      if (interaction.isMessageContextMenuCommand()) {
        const record = client.commands.message.get(interaction.commandName);
        if (!record) return this.warnMissing(interaction.commandName);
        return await record.instance.execute(interaction);
      }
    } catch (error) {
      console.error(`[CommandError]`, error);
      return safeReply(interaction, {
        content: '⚠️ There was an unexpected error while executing this command.',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  private warnMissing(commandName: string) {
    console.warn(`[InteractionCreateEvent] - Command "${commandName}" not found.`);
  }
}

export default InteractionCreateEvent;
