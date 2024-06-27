import { BaseInteraction, Guild, GuildChannel, type LocalizationMap, Message } from 'discord.js';
import type { LocalizedString } from 'typesafe-i18n';

import { L } from '../../i18n/i18n-node';
import type { Locales, TranslationFunctions } from '../../i18n/i18n-types';
import { baseLocale, isLocale, locales } from '../../i18n/i18n-util';

import { db } from '../../db';
import type { FetchTContext, FetchTTarget, TranslationTarget } from './types';

async function fetchLocale(context: FetchTContext): Promise<Locales> {
	if (context.interactionGuildLocale || context.interactionLocale) {
		const locale = context.interactionGuildLocale ?? context.interactionLocale;
		if (locale && isLocale(locale)) return locale; // <-- returning here
	}

	if (!context.guild) return baseLocale;

	const settings = await db.get(`settings-${context.guild.id}`);
	if (settings?.lang) return settings.lang;

	return baseLocale;
}

export function getT(target?: TranslationTarget): TranslationFunctions {
	if (target == null) return L[baseLocale];
	if (typeof target === 'string' && isLocale(target)) return L[target];

	if (target instanceof BaseInteraction) return resolveLocale(target.guildLocale ?? target.locale);
	if (target instanceof Message && target.inGuild())
		return resolveLocale(target.guild.preferredLocale);
	if (target instanceof Guild) return resolveLocale(target.preferredLocale);
	if (target instanceof GuildChannel) return resolveLocale(target.guild.preferredLocale);

	return L[baseLocale];
}

export async function fetchT(target: FetchTTarget): Promise<TranslationFunctions> {
	if (target instanceof BaseInteraction) {
		console.log('target is instanceof BaseInteraction');
		console.log('Fetching locale...');
		const locale = await fetchLocale({
			user: target.user,
			guild: target.guild,
			channel: target.channel,
			interactionLocale: target.locale,
			interactionGuildLocale: target.guildLocale,
		});
		console.log('Locale fetched:', locale);
		console.log('Resolving locale...');
		const resolved = resolveLocale(locale);
		console.log('Locale resolved:', resolved);
		return resolved;
	}

	console.log('THIS SHOULD NOT BE SHOWN');

	if (target instanceof Message) {
		const locale = await fetchLocale({
			user: target.author,
			guild: target.guild,
			channel: target.channel,
		});
		return resolveLocale(locale);
	}

	if (target instanceof Guild) {
		const locale = await fetchLocale({ guild: target });
		return resolveLocale(locale);
	}

	if (target.isDMBased()) {
		const locale = await fetchLocale({ channel: target });
		return resolveLocale(locale);
	}

	const locale = await fetchLocale({ guild: target.guild, channel: target });

	return L[isLocale(locale) ? locale : baseLocale];
}

export function localizations<TL = typeof L>(
	fn: (t: TL[keyof TL]) => LocalizedString,
): LocalizationMap {
	const entries = locales.map((l) => [l, fn(L[l] as TL[keyof TL])]);
	return Object.fromEntries(entries);
}

export function resolveLocale(locale: string): TranslationFunctions {
	return L[isLocale(locale) ? locale : baseLocale];
}
