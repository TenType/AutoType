import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default class Command {
    constructor(public props: CommandProps) {}
}

export interface CommandProps {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
