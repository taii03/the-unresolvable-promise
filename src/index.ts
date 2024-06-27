import 'dotenv/config';

import { GatewayIntentBits } from 'discord.js';
import { Client, load } from 'sunar';
import { getDirname } from './consts';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
});

await load(`${getDirname()}/{commands,signals}/**/*.{js,ts}`);

client.login();
