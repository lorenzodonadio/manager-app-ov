import { locale } from '$lib/translations';
import dayjs, { Dayjs } from 'dayjs';
import { get } from 'svelte/store';

export const calculateFutureDate = (n = 30) => {
	let futureDate = dayjs().add(n, 'day');

	// Check if the day is a weekend and adjust accordingly
	while (futureDate.day() === 0 || futureDate.day() === 6) {
		futureDate = futureDate.add(1, 'day');
	}
	return futureDate;
};

export const daysUntil = (target: string | Date | Dayjs | null | undefined): number | null => {
	const targetDate = dayjs(target);
	// Check if the parsed date is valid
	if (!targetDate.isValid()) return null;
	return targetDate.diff(dayjs(), 'day');
};

// Both versions of the function will give you the closest weekday after adding n days to the current date.
export const parseDateToMonthDayYear = (date: Date | string | null | undefined) => {
	if (!date) return ' - ';

	let d = date;
	if (typeof d === 'string') {
		try {
			d = new Date(date);
		} catch (error) {
			console.error('Can not convert string to Date');
			return ' - ';
		}
	}

	return d.toLocaleDateString(get(locale), {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
};

// Filters any array containing created_at as property
interface obj {
	created_at?: string | null;
}
export const filterArrByDate = (arr: obj[], date: string | null | undefined) => {
	try {
		return arr.filter((x) => {
			if (!x.created_at || !date) return false;
			return new Date(x.created_at) >= new Date(date);
		});
	} catch (error) {
		console.error(error);
		return [];
	}
};
