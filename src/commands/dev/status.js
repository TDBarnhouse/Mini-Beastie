const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config({ 
    path: './config/.env' 
  });
const { greenCheck, redX } = require('../../variables/logos.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Set the status of the bot')
        .addStringOption(option => option
            .setName('status')
            .setDescription('The status you want the bot to have')
            .setMaxLength(128)
            .setRequired(true))
        .addStringOption(option => option
            .setName('type')
            .setDescription('The type of status you want the bot to have')
            .addChoices({ name: 'Watching', value: `${4}`}, { name: 'Playing', value: `${1}`}, { name: 'Listening', value: `${3}`}, { name: 'Competing', value: `${6}`}, { name: 'Streaming', value: `${2}`})
            .setRequired(true)),
	async execute(interaction, client) {
        const { options } = interaction;
        const status = options.getString('status');
        const type = options.getString('type');

        const embedNo = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(`${redX} This command is only for devs.`)
        
        if (interaction.user.id != process.env.MEMBER_ID)
            await interaction.reply({ embeds: [embedNo], ephemeral: true });
        else {
            client.user.setActivity({
                name: status,
                type: type - 1,
                url: 'https://twitch.tv/ItsBeastieBoy'
            })

            const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription(`${greenCheck} The status of the bot has been updated with \`${status}\` on type ${type - 1}.`)
		    
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
	},
};