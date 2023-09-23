import { locale } from '$lib/translations/index';
import { get } from 'svelte/store';

const TRANSLATIONS = {
	en: {
		FILTER: 'Filters',
		CARTRIDGE: 'Cartridge',
		REPLENISHMENT: 'Replenishment',
		RETURN: 'Return',
		ADJUSTMENT: 'Adjustment'
	},
	es: {
		FILTER: 'Filtros',
		CARTRIDGE: 'Cartucho',
		REPLENISHMENT: 'Entrega',
		RETURN: 'Devolución',
		ADJUSTMENT: 'Ajuste'
	}
};

export const translateSup = (s: string) => {
	const l = get(locale) ?? 'en';
	// @ts-ignore
	const t = TRANSLATIONS[l][s];
	if (t) return t;
	return s;
};
