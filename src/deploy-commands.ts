import 'dotenv/config';

import { REST, Routes } from 'discord.js';
import { importCommands } from './helpers';

const commands = importCommands(__dirname).map((options) =>
    options.data.toJSON()
);

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(
            `Refreshing ${commands.length} application (/) commands in ${process.env.NODE_ENV} mode`
        );

        const route =
            process.env.NODE_ENV == 'production'
                ? Routes.applicationCommands(process.env.DISCORD_CLIENT_ID)
                : Routes.applicationGuildCommands(
                      process.env.DISCORD_CLIENT_ID,
                      process.env.DISCORD_GUILD_ID
                  );

        const data = (await rest.put(route, { body: commands })) as unknown[];

        console.log(
            `Successfully reloaded ${data.length} application (/) commands`
        );
    } catch (error) {
        console.error(error);
    }
})();
