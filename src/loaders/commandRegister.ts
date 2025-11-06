import { REST, Routes } from 'discord.js';
import { Env } from '../config/env';
import type { CommandRecord, LoadedCommands } from '../interfaces/LoadedCommands';
import type BaseSlashCommand from '../interfaces/commands/BaseSlashCommand';
import type BaseUserContextCommand from '../interfaces/commands/BaseUserContextCommand';
import type BaseMessageContextCommand from '../interfaces/commands/BaseMessageContextCommand';
import { symbols } from '../config/Emojis';

async function commandRegister(commands: LoadedCommands): Promise<void> {
  const { check_mark, warning, x } = symbols;

  console.log(`[commandRegister] ${check_mark} Registering commands...`);

  try {
    const { BOT_TOKEN, CLIENT_ID, DEV_GUILD_ID, NODE_ENV } = Env;

    if (!BOT_TOKEN) {
      console.error(`[commandRegister] ${x} No BOT_TOKEN environment variable found.`);
      return;
    }

    if (!CLIENT_ID) {
      console.error(`[commandRegister] ${x} No CLIENT_ID environment variable found.`);
      return;
    }

    const rest = new REST().setToken(BOT_TOKEN);
    const payload = buildCommandPayload();

    if (NODE_ENV === 'development' && DEV_GUILD_ID) {
      console.log(`[commandRegister] ${warning} Quickly registering commands in the development guild.`);
      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: payload,
      });
      console.log(`[commandRegister] ${check_mark} Successfully registered ${payload.length} commands (/).`);
      return;
    }

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: payload,
    });

    console.log(`[commandRegister] ${check_mark} Successfully registered ${payload.length} commands (/).`);
  } catch (error) {
    console.error(`[commandRegister] ${x}  Error registering commands: `);
    console.error(error);
  }

  function buildCommandPayload() {
    const slashJson = [...commands.slash.values()].map((c: CommandRecord<BaseSlashCommand>) => c.instance.register());
    const userJson = [...commands.user.values()].map((c: CommandRecord<BaseUserContextCommand>) =>
      c.instance.register(),
    );
    const messageJson = [...commands.message.values()].map((c: CommandRecord<BaseMessageContextCommand>) =>
      c.instance.register(),
    );

    return [...slashJson, ...userJson, ...messageJson];
  }
}

export default commandRegister;
