import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export const geoPos = writable<GeolocationCoordinates>();
export const lastPosTime = writable<number>(undefined);

const geoOptions = {
	enableHighAccuracy: false,
	timeout: 5000,
	maximumAge: 60
};

const geoSucess = (pos: GeolocationPosition) => {
	lastPosTime.set(Date.now());
	geoPos.set(pos.coords);
	console.log('Position GET');
	// alert(`Succes posit#ion: ${pos.coords.latitude} ${pos.coords.longitude} `);
};

const geoError = (err: GeolocationPositionError) => {
	console.warn(`ERROR(${err.code}): ${err.message}`);
	// if (get(locale) === 'es') {
	// 	alert('Error al obtener la geolocalización, verifique su configuración de privacidad');
	// } else {
	// 	alert('Error getting geolocation check your privacy settings');
	// }
};
//Only get position every 10 mins
export const getPosition = () => {
	const lastT = get(lastPosTime);
	if (browser) {
		if (!lastT) {
			navigator.geolocation.getCurrentPosition(geoSucess, geoError, geoOptions);
		} else {
			const diffInMins = Math.floor((Date.now() - lastT) / (1000 * 60));
			if (diffInMins >= 10)
				navigator.geolocation.getCurrentPosition(geoSucess, geoError, geoOptions);
		}
	}
};
