import Command from '../structures/Command';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Is this thing on?'),

    async execute(interaction) {
        const embed = new EmbedBuilder().setTitle('🏓 Pinging...').addFields(
            {
                name: 'Heartbeat',
                value: `${interaction.client.ws.ping}ms`,
                inline: true,
            },
            { name: 'Roundtrip', value: 'Waiting...', inline: true }
        );

        const sent = await interaction.reply({
            embeds: [embed],
            fetchReply: true,
        });

        const latency = sent.createdTimestamp - interaction.createdTimestamp;

        embed
            .setColor('Blurple')
            .setTitle('🏓 Pong!')
            .spliceFields(1, 1, {
                name: 'Roundtrip',
                value: `${latency}ms`,
                inline: true,
            });

        interaction.editReply({ embeds: [embed] });
    },
} satisfies Command;
