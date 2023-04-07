const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    deleted: false,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    run: ({ interaction }) => {
        interaction.reply('Pong!');
    },
    devOnly: false,
};