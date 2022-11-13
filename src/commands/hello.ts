import { SlashCommandBuilder } from 'discord.js';
import Command from '../structures/Command';

export default new Command({
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Hello world!'),

    async execute(interaction) {
        interaction.reply('Hello world!');
    },
});
