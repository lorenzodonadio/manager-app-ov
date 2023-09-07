import { errorToast } from '$lib/utils/toasts';

interface GeolocationResult {
	country: string;
	countryCode: string;
	state: string;
	city: string | null;
	town: string | null;
	displayName: string;
	boundingbox: [string, string, string, string];
}

export const fetchReverseGeolocation = async (
	lat: number,
	lon: number
): Promise<GeolocationResult> => {
	const res = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);

	if (!res.ok) throw new Error('Geolocation Error');

	const reverseLocation = await res.json();

	if (!reverseLocation?.address || !reverseLocation?.boundingbox) {
		errorToast('No address');
		throw new Error('No address');
	}

	const country: string = reverseLocation?.address?.country ?? '';
	const countryCode: string = reverseLocation?.address?.country_code ?? '';
	const state: string = reverseLocation?.address?.state ?? '';
	const town: string | null =
		reverseLocation?.address?.town ?? reverseLocation?.address?.county ?? null;
	const village: string | null = reverseLocation?.address?.village ?? null;
	const city: string | null = reverseLocation?.address?.city ?? null;

	const displayName = city
		? `${city} , ${state} , ${country}`
		: village
		? `${village} , ${town} , ${state} , ${country}`
		: `${town} , ${state} , ${country}`;

	return {
		country,
		countryCode: countryCode.toUpperCase(),
		state,
		city,
		town,
		displayName,
		boundingbox: reverseLocation.boundingbox
	};
};
