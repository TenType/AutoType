import fs from 'node:fs';
import path from 'node:path';

import Command, { CommandProps } from './structures/Command';

export function importCommands(dir: string): CommandProps[] {
    const commandsPath = path.join(dir, 'commands');
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'));

    return commandFiles.map(
        (file) => (require(`./commands/${file}`).default as Command).props
    );
}
