import {Client, IntentsBitField} from "discord.js";

(async () => {
    const client = new Client({intents: IntentsBitField.Flags.Guilds})

    await client.login(process.env.BOT_TOKEN)
    console.log("[INDEX] - index successfully loaded");
})();