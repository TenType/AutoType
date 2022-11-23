import Command from '../structures/Command';
import { hideLinkEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Hello world!'),

    async execute(interaction) {
        const message = hyperlink(
            'Hello world!',
            hideLinkEmbed('https://www.youtube.com/watch?v=j3sks_CJoZ0')
        );

        await interaction.reply(message);
    },
} satisfies Command;
