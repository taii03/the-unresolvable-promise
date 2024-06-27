import { Signal, execute } from 'sunar';
import { registerGlobalCommands } from 'sunar/registry';

const signal = new Signal('ready', { once: true });

execute(signal, async (client) => {
	await registerGlobalCommands(client.application);
	console.log('Bot ready!');
});

export { signal };
