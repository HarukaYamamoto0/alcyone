import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { LoadedCommands } from '../interfaces/LoadedCommands';
import type { BaseCommand } from '../interfaces/commands/BaseCommand';
import BaseSlashCommand from '../interfaces/commands/BaseSlashCommand';
import BaseUserContextCommand from '../interfaces/commands/BaseUserContextCommand';
import BaseMessageContextCommand from '../interfaces/commands/BaseMessageContextCommand';

export async function loadAllCommands(): Promise<LoadedCommands> {
  const root = resolve('src/commands');

  const slash = new Map();
  const user = new Map();
  const message = new Map();
  const categories = new Set<string>();

  const types = readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name); // "slash", "context"

  const loaders: Promise<void>[] = [];

  for (const type of types) {
    const typeDir = join(root, type);

    const catFolders = readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const category of catFolders) {
      const categoryDir = join(typeDir, category);
      categories.add(category);

      const files = readdirSync(categoryDir).filter((f) => f.endsWith('.ts'));

      for (const file of files) {
        const filePath = join(categoryDir, file);

        loaders.push(
          (async () => {
            const module = await import(filePath);
            const CommandClass = module.default;
            if (!CommandClass) return;

            const instance: BaseCommand = new CommandClass();

            instance.setCategory(category);

            if (instance instanceof BaseSlashCommand) {
              slash.set(instance.name, {
                name: instance.name,
                path: filePath,
                instance,
              });
            } else if (instance instanceof BaseUserContextCommand) {
              user.set(instance.name, {
                name: instance.name,
                path: filePath,
                instance,
              });
            } else if (instance instanceof BaseMessageContextCommand) {
              message.set(instance.name, {
                name: instance.name,
                path: filePath,
                instance,
              });
            }
          })(),
        );
      }
    }
  }

  // Parallelize imports → Faster
  await Promise.all(loaders);

  return {
    slash,
    user,
    message,
    categories: Array.from(categories),
  };
}
