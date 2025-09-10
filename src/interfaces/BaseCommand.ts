import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

/**
 * Represents an abstract base class for creating and managing slash commands in a Discord bot.
 * This class extends the SlashCommandBuilder and provides a structure for defining and executing commands.
 *
 * Subclasses must implement the `execute` method to handle the interaction logic for the command.
 *
 * Methods:
 * - execute(interaction): An abstract method that subclasses must implement to define the logic for executing the command.
 *
 * This class cannot be instantiated directly and is intended to be extended by command-specific classes.
 */
abstract class BaseCommand extends SlashCommandBuilder {
    protected constructor() {
        super();
    }

    /**
     * Executes the defined operation based on the provided interaction.
     *
     * @param {ChatInputCommandInteraction} interaction - The interaction object containing the command details and user input.
     * @return {Promise<void>} A promise that resolves when the operation has been successfully executed.
     */
    abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export default BaseCommand;
