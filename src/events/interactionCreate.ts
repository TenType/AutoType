import { Events } from 'discord.js';
import Client from '../structures/Client';
import Event from '../structures/Event';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = (interaction.client as Client).commands.get(
            interaction.commandName
        );

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
    },
} satisfies Event<Events.InteractionCreate>;
