import {Events, Interaction, MessageFlagsBitField} from "discord.js";
import {AlcyoneClient} from "../core/Client";
import {BaseBotEvent} from "../interfaces/BaseBotEvent";

class InteractionCreateEvent implements BaseBotEvent {
    eventType = Events.InteractionCreate;
    once = false;

    async execute(client: AlcyoneClient, interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

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
                    flags: MessageFlagsBitField.Flags.Ephemeral
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlagsBitField.Flags.Ephemeral
                });
            }
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export default InteractionCreateEvent