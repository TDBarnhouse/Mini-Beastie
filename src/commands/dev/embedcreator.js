const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
require('dotenv').config({ 
    path: './config/.env' 
  });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embedcreator')
		.setDescription('Create a new embed (Use /whitespace for whitespace characters to create new lines)')
        .addStringOption(option => option
            .setName('title')
            .setDescription('The title of the embed')
            .setRequired(true))
        .addStringOption(option => option
            .setName('description')
            .setDescription('The description of the embed')
            .setRequired(true))
        .addStringOption(option => option
            .setName('color')
            .setDescription('The color of the embed in hex')
            .setMaxLength(6)
            .setRequired(true))	
        .addStringOption(option => option
            .setName('image')
            .setDescription('The image of the embed')
            .setRequired(false))
        .addStringOption(option => option
            .setName('thumbnail')
            .setDescription('The thumbnail of the embed')
            .setRequired(false))
        .addStringOption(option => option
            .setName('field-name')
            .setDescription('The field name of the embed')
            .setRequired(false))  
        .addStringOption(option => option
            .setName('field-value')
            .setDescription('The field value of the embed')
            .setRequired(false)),
    async execute(interaction) {
        const { options } = interaction;
        const title = options.getString('title');
        const description = options.getString('description');
        const color = options.getString('color');
        const image = options.getString('image');
        const thumbnail = options.getString('thumbnail');
        const fieldName = options.getString('field-name') || ' ';
        const fieldValue = options.getString('field-value') || ' ';

        if(image) {
            if(!image.startsWith('http'))
                return await interaction.reply({ content: 'You cannot make that your image.', ephemeral: true })
        }

        if (thumbnail) {
            if(!thumbnail.startsWith('http'))
                return await interaction.reply({ content: 'You cannot make that your thumbnail.', ephemeral: true })
        }

        if (interaction.user.id != process.env.MEMBER_ID)
            return await interaction.reply({ content: 'This command is only for devs.', ephemeral: true });
        else {
            const embedSend = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(parseInt(color, 16))
                .setImage(image)
                .addFields({ name: `${fieldName}`, value: `${fieldValue}` })
                .setFooter({ text: 'Mini-Beastie', iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .setTimestamp()
                
            const embedReply = new EmbedBuilder()
                .setColor(0xFF0000)
                .setDescription(':greenCheck: Your custom embed has been created.' )

            await interaction.reply({ embeds: [embedReply], ephemeral: true });
            await interaction.channel.send({ embeds: [embedSend] });
        }
	},
};