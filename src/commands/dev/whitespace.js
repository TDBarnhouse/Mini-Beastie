const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { redX } = require('../../variables/logos.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitespace')
		.setDescription('Whitespace characters for new lines on the embed creator'),
	async execute(interaction) {

        const embedNo = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(`${redX} This command is only for devs.`)
        
        if (interaction.user.id != process.env.MEMBER_ID)
            await interaction.reply({ embeds: [embedNo], ephemeral: true });
        else {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription('[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]')
		    
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};