const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whitespace')
		.setDescription('Whitespace characters for new lines on the embed creator'),
	async execute(interaction) {

        if (interaction.user.id != process.env.MEMBER_ID)
            return await interaction.reply({ content: 'This command is only for devs.', ephemeral: true });
        else {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription('[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]\n[ ]')
		    
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};