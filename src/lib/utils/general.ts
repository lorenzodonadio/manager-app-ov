export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const strToFloatPrecision = (s: string, precision: number = 5) => {
	const number = parseFloat(s);

	if (isNaN(number)) {
		return null;
	}

	return +number.toFixed(precision);
};
