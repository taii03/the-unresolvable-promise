// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en-US'

export type Locales =
	| 'en-US'
	| 'es-ES'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	ping: {
		/**
		 * i​n​t​e​r​n​a​t​i​o​n​a​l​i​z​a​t​i​o​n
		 */
		name: string
		/**
		 * S​h​o​w​ ​t​h​e​ ​b​o​t​ ​l​a​t​e​n​c​y​.
		 */
		description: string
		/**
		 * T​h​e​ ​p​i​n​g​ ​i​s​ ​{​p​i​n​g​}​m​s​.
		 * @param {number} ping
		 */
		reply: RequiredParams<'ping'>
	}
}

export type TranslationFunctions = {
	ping: {
		/**
		 * internationalization
		 */
		name: () => LocalizedString
		/**
		 * Show the bot latency.
		 */
		description: () => LocalizedString
		/**
		 * The ping is {ping}ms.
		 */
		reply: (arg: { ping: number }) => LocalizedString
	}
}

export type Formatters = {}