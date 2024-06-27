import { QuickDB } from 'quick.db';

import type { Locales } from './i18n/i18n-types';

export interface Settings {
	lang: Locales;
}
// This is a testing db
export const db = new QuickDB<Settings>();
