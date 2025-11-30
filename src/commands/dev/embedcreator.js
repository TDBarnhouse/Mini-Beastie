const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config({ 
    path: './config/.env' 
});
const { greenCheck, redX } = require('../../variables/logos.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedcreator')
        .setDescription('Create a new embed')
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
            .setRequired(false))
        .addBooleanOption(option => option
            .setName('timestamp')
            .setDescription('Include a timestamp')
            .setRequired(false))
        .addStringOption(option => option
            .setName('footer')
            .setDescription('The footer of the embed')
            .setRequired(false)),

    async execute(interaction) {
        const { options } = interaction;

        const title = options.getString('title');
        const description = options.getString('description');
        const color = options.getString('color');
        const image = options.getString('image');
        const thumbnail = options.getString('thumbnail');

        const fieldName = options.getString('field-name');
        const fieldValue = options.getString('field-value');

        const timestamp = options.getBoolean('timestamp');
        const footer = options.getString('footer');

        if (image && !image.startsWith('http'))
            return await interaction.reply({ content: 'Invalid image URL.', ephemeral: true });

        if (thumbnail && !thumbnail.startsWith('http'))
            return await interaction.reply({ content: 'Invalid thumbnail URL.', ephemeral: true });

        const embedNo = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription(`${redX} This command is only for devs.`);

        if (interaction.user.id != process.env.MEMBER_ID) {
            return await interaction.reply({ embeds: [embedNo], ephemeral: true });
        }

        const embedSend = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(parseInt(color, 16));

        if (image) embedSend.setImage(image);
        if (thumbnail) embedSend.setThumbnail(thumbnail);

        if (fieldName && fieldValue && fieldName.trim() !== '' && fieldValue.trim() !== '') {
            embedSend.addFields({ name: fieldName, value: fieldValue });
        }

        if (timestamp) embedSend.setTimestamp();

        if (footer && footer.trim() !== '') {
            embedSend.setFooter({ text: footer });
        }

        const embedReply = new EmbedBuilder()
            .setColor(0x00FF00)
            .setDescription(`${greenCheck} Your custom embed has been created.`);

        await interaction.reply({ embeds: [embedReply], ephemeral: true });
        await interaction.channel.send({ embeds: [embedSend] });
    },
};