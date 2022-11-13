import path from 'node:path';

import {
    Client as BaseClient,
    Collection,
    GatewayIntentBits,
} from 'discord.js';
import { CommandProps } from './Command';
import { importCommands } from '../utils';

export default class Client extends BaseClient {
    commands = new Collection<string, CommandProps>();

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
    }

    start() {
        this.loadCommands();
        this.login(process.env.DISCORD_TOKEN);
    }

    private loadCommands() {
        importCommands(path.resolve(__dirname, '..')).forEach((command) =>
            this.commands.set(command.data.name, command)
        );
    }
}
