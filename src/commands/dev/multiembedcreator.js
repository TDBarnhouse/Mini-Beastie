const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config({ 
    path: './config/.env' 
});
const { greenCheck, redX } = require('../../variables/logos.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multiembedcreator')
        .setDescription('Create up to 3 embeds')

        // Required options first
        .addStringOption(option => option.setName('embed1-title').setDescription('The title of embed 1').setRequired(true))
        .addStringOption(option => option.setName('embed1-description').setDescription('The description of embed 1').setRequired(true))
        .addStringOption(option => option.setName('embed1-color').setDescription('The color of embed 1 in hex').setMaxLength(6).setRequired(true))

        .addStringOption(option => option.setName('embed2-title').setDescription('The title of embed 2').setRequired(true))
        .addStringOption(option => option.setName('embed2-description').setDescription('The description of embed 2').setRequired(true))
        .addStringOption(option => option.setName('embed2-color').setDescription('The color of embed 2 in hex').setMaxLength(6).setRequired(true))

        // Optional options after all required
        .addStringOption(option => option.setName('embed1-image').setDescription('The image of embed 1').setRequired(false))
        .addStringOption(option => option.setName('embed1-thumbnail').setDescription('The thumbnail of embed 1').setRequired(false))
        .addStringOption(option => option.setName('embed1-footer').setDescription('The footer of embed 1').setRequired(false))
        .addBooleanOption(option => option.setName('embed1-timestamp').setDescription('Include a timestamp in embed 1').setRequired(false))

        .addStringOption(option => option.setName('embed2-image').setDescription('The image of embed 2').setRequired(false))
        .addStringOption(option => option.setName('embed2-thumbnail').setDescription('The thumbnail of embed 2').setRequired(false))
        .addStringOption(option => option.setName('embed2-footer').setDescription('The footer of embed 2').setRequired(false))
        .addBooleanOption(option => option.setName('embed2-timestamp').setDescription('Include a timestamp in embed 2').setRequired(false))

        .addStringOption(option => option.setName('embed3-title').setDescription('The title of embed 3').setRequired(false))
        .addStringOption(option => option.setName('embed3-description').setDescription('The description of embed 3').setRequired(false))
        .addStringOption(option => option.setName('embed3-color').setDescription('The color of embed 3 in hex').setMaxLength(6).setRequired(false))
        .addStringOption(option => option.setName('embed3-image').setDescription('The image of embed 3').setRequired(false))
        .addStringOption(option => option.setName('embed3-thumbnail').setDescription('The thumbnail of embed 3').setRequired(false))
        .addStringOption(option => option.setName('embed3-footer').setDescription('The footer of embed 3').setRequired(false))
        .addBooleanOption(option => option.setName('embed3-timestamp').setDescription('Include a timestamp in embed 3').setRequired(false)),

    async execute(interaction) {
        const { options } = interaction;

        const embedNo = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription(`${redX} This command is only for devs.`);

        if (interaction.user.id != process.env.MEMBER_ID) {
            return await interaction.reply({ embeds: [embedNo], ephemeral: true });
        }

        const embeds = [];

        for (let i = 1; i <= 3; i++) {
            const title = options.getString(`embed${i}-title`);
            const description = options.getString(`embed${i}-description`);
            const color = options.getString(`embed${i}-color`);
            const image = options.getString(`embed${i}-image`);
            const thumbnail = options.getString(`embed${i}-thumbnail`);
            const footer = options.getString(`embed${i}-footer`);
            const timestamp = options.getBoolean(`embed${i}-timestamp`);

            if (!title && !description && !image && !thumbnail && !footer) continue;

            if (image && !image.startsWith('http')) {
                return await interaction.reply({ content: `Embed ${i}: Invalid image URL.`, ephemeral: true });
            }
            if (thumbnail && !thumbnail.startsWith('http')) {
                return await interaction.reply({ content: `Embed ${i}: Invalid thumbnail URL.`, ephemeral: true });
            }

            const embed = new EmbedBuilder();

            if (title) embed.setTitle(title);
            if (description) embed.setDescription(description);
            if (color) embed.setColor(parseInt(color, 16));
            if (image) embed.setImage(image);
            if (thumbnail) embed.setThumbnail(thumbnail);
            if (footer && footer.trim() !== '') embed.setFooter({ text: footer });
            if (timestamp) embed.setTimestamp();

            embeds.push(embed);
        }

        const embedReply = new EmbedBuilder()
            .setColor(0x00FF00)
            .setDescription(`${greenCheck} Your custom embeds have been created.`);

        await interaction.reply({ embeds: [embedReply], ephemeral: true });
        await interaction.channel.send({ embeds });
    },
};
