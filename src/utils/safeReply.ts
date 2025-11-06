import type {
  Interaction,
  InteractionReplyOptions,
  InteractionResponse,
  Message,
  RepliableInteraction,
} from 'discord.js';

function isRepliable(interaction: Interaction): interaction is RepliableInteraction {
  return 'reply' in interaction && typeof interaction.reply === 'function';
}

/**
 * Safely replies to an interaction, ensuring proper handling of deferred or already replied interactions.
 *
 * @param {Interaction} interaction - The interaction object to reply to.
 * @param {InteractionReplyOptions} options - The options for the reply, including the content and
 * additional parameters.
 * @return {Promise<Message | InteractionResponse | undefined>} A promise that resolves with the result of
 * the reply or follow-up process, or undefined if the interaction is not repliable.
 */
async function safeReply(
  interaction: Interaction,
  options: InteractionReplyOptions,
): Promise<Message | InteractionResponse | undefined> {
  //The interaction is not responding — likely a modal submitted fail or something rare.
  if (!isRepliable(interaction)) {
    console.warn('[safeReply] Interaction is not repliable.');
    return;
  }

  try {
    if (interaction.replied || interaction.deferred) {
      // follow Up doesn't require Response:true, so OK, just stay quiet.
      return await interaction.followUp(options);
    }
    // Reply requires WithResponse:true because of the overload,
    // so we force fetchReply to keep TS happy.
    return await interaction.reply({ ...options });
  } catch (err) {
    console.error('[safeReply] Failed to send reply:', err);
  }
}

export default safeReply;
