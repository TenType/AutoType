import { Events } from 'discord.js';
import Event from '../structures/Event';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is now online!`);
    },
} satisfies Event<Events.ClientReady>;
