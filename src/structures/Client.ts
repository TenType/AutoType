import fs from 'node:fs';
import path from 'node:path';

import {
    Client as BaseClient,
    ClientEvents,
    Collection,
    GatewayIntentBits,
} from 'discord.js';
import { CommandProps } from './Command';
import { importCommands } from '../helpers';
import Event from './Event';

export default class Client extends BaseClient {
    commands = new Collection<string, CommandProps>();

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
    }

    start() {
        this.loadCommands();
        this.loadEvents();
        this.login(process.env.DISCORD_TOKEN);
    }

    private loadCommands() {
        importCommands(path.resolve(__dirname, '..')).forEach((command) =>
            this.commands.set(command.data.name, command)
        );
    }

    private loadEvents() {
        const eventsPath = path.join(__dirname, '..', 'events');
        const eventFiles = fs
            .readdirSync(eventsPath)
            .filter((file) => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = (
                require(filePath).default as Event<keyof ClientEvents>
            ).props;
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}
