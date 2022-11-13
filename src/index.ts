import 'dotenv/config';

import Client from './structures/Client';
import { Events } from 'discord.js';

const client = new Client();

client.start();

client.once(Events.ClientReady, (c) => {
    console.log(`${c.user.tag} is now online!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching "${command}" found`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'An error occurred while running this command!',
            ephemeral: true,
        });
    }
});
