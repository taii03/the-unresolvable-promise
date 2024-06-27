import type {
	BaseInteraction,
	Guild,
	GuildChannel,
	Locale,
	Message,
	MessageComponentInteraction,
	StageChannel,
	TextBasedChannel,
	User,
	VoiceChannel,
} from 'discord.js';
import type { Locales } from '../../i18n/i18n-types';

export type TranslationTarget =
	| BaseInteraction
	| GuildChannel
	| Guild
	| Locales
	| Message
	| MessageComponentInteraction;

export type FetchTChannel = TextBasedChannel | StageChannel | VoiceChannel;
export type FetchTTarget = BaseInteraction | Guild | Message | MessageComponentInteraction | FetchTChannel;

export interface FetchTContext {
	guild?: Guild | null;
	channel?: FetchTChannel | null;
	user?: User | null;
	interactionGuildLocale?: Locale | null;
	interactionLocale?: Locale | null;
}
