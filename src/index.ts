import 'dotenv/config';

import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
    console.log(`${c.user.tag} is now online!`);
});

client.login(process.env.DISCORD_TOKEN);
