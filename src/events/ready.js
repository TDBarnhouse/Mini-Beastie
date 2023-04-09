const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
        console.log(`${client.user.tag} is now online.`);

		client.user.setActivity({
			name: 'Visual Studio Code',
			type: ActivityType.playing,
			url: 'https://twitch.tv/ItsBeastieBoy',
		});
	},
};