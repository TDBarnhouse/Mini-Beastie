const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Gives information about the bot'),
	async execute(interaction, client) {
        const name = 'Mini-Beastie';
        const icon = `${client.user.displayAvatarURL()}`;
        let serverCount = await client.guilds.cache.reduce((a, b) =>
            a + b.memberCount, 0);

        let totalSeconds = (client.uptime/1000);
        let days = Math.floor(totalSeconds/86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds/86400);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds/60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, & ${seconds} seconds`;

        let ping = `${Date.now() - interaction.createdTimestamp} ms.`;

        const member = await client.guilds.cache.get(interaction.guildId).members.fetch(client.user.id);

        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Mini-Beastie Information:')
            .setThumbnail(`${icon}`)
            .setFooter({ text: 'Mini-Beastie', iconURL: icon })
            .setTimestamp()
            .addFields({ name: 'Server Numbers', value: `${client.guilds.cache.size}`, inline: true })
            .addFields({ name: 'Server Members', value: `${serverCount}`, inline: true })
            .addFields({ name: 'Latency', value: `${ping}`, inline: true })
            .addFields({ name: 'Uptime', value: `\`\`\`${uptime}\`\`\`` })
            .addFields({ name: 'Joined Server', value: `<t:${parseInt(member.joinedAt/1000)}:R>`, inline: true })
            .addFields({ name: 'Joined Discord', value: `<t:${parseInt(member.user.createdAt/1000)}:R>`, inline: true })

        await interaction.reply({ embeds: [embed], ephemeral: true });
        },
};