const { Events, ActivityType } = require('discord.js');
require('dotenv').config({ 
    path: './config/.env' 
  });

const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(process.env.RPC_ID)

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
        console.log(`${client.user.tag} is now online.`);

		client.user.setActivity({
			name: 'Beautiful People',
			type: ActivityType.playing,
			url: 'https://twitch.tv/ImBeastieBoy',
		});

		async function activity() {
			if(!RPC)
				return
		
			RPC.setActivity({
				details: 'Mini-Beastie v1.1.7',
				state: '(╯°□°）╯︵ ┻━┻',
				largeImageKey: 'https://media.giphy.com/media/JUgVtMOrWtprW/giphy.gif',
				smallImageKey: 'https://c.tenor.com/TgKK6YKNkm0AAAAi/verified-verificado.gif',
				instance: false,
				startTimestamp: Date.now(),
				buttons: [
					{
						label: 'Twitch',
						url: 'https://twitch.tv/ImBeastieBoy'
					},
					{
						label: 'Discord',
						url: 'https://discord.gg/qypzs6V'
					}
				]
			})
		}

		setInterval(() => {
			activity();
		}, 100000000)

		RPC.on('ready', async () => {
			console.log('RPC Presence is up.');
			activity();
		})

		RPC.login({ clientId: process.env.RPC_ID });
	},	
};