import { Slash, execute } from 'sunar';
import { fetchT, getT, localizations } from '../utils/i18n';

const slash = new Slash({
	name: getT().ping.name(),
	description: getT().ping.description(),
	nameLocalizations: localizations((t) => t.ping.name()),
	descriptionLocalizations: localizations((t) => t.ping.description()),
});

execute(slash, async (interaction) => {
	await interaction.deferReply();
	const ping = interaction.client.ws.ping;

	console.log('Fetching translations...');
	const t = await fetchT(interaction);
	console.log('Translations fetched:', t);

	await interaction.editReply({ content: t.ping.reply({ ping }) });
});

export { slash };
