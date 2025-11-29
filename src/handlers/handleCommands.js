const { REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ 
    path: './config/.env' 
  });

module.exports = (client) => {
    client.handleCommands = async () => {
        client.commandArray = [];

        const commandFolders = fs.readdirSync(path.join(__dirname, '../commands'));

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(path.join(__dirname, `../commands/${folder}/${file}`));

                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${commandFiles} is missing a required "data" or "execute" property.`);
                }
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);

                const data = await rest.put(
                    // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: client.commandArray },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}