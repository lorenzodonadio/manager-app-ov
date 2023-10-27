// we only have COP for now, but will hopefully expand in the future
const bonusMapCOP: Record<number, number> = {
	8: 60000,
	9: 60000,
	10: 60000,
	11: 60000,
	12: 70000,
	13: 80000,
	14: 90000,
	15: 110000,
	16: 130000,
	17: 130000,
	18: 130000,
	19: 130000,
	20: 130000,
	21: 140000,
	22: 150000,
	23: 170000,
	24: 200000
};

const keys = Object.keys(bonusMapCOP);

/**
 * @param units units of filters to calculate the bonus for
 * @param currency 'ALPHA 2 currency code, default is COP'
 */
export const getBonus = (units: number, currency: string = 'COP') => {
	// TODO implement to get the bonus based on the bonusMapCOP
	if (currency !== 'COP') {
		throw new Error(`Unsupported currency: ${currency}. Only COP is supported currently.`);
	}
	if (units < Number(keys[0])) {
		return 0;
	}
	const lastKey = Number(keys.at(-1)!);
	if (units > lastKey) {
		return bonusMapCOP[lastKey];
	}

	return bonusMapCOP[units];
};
