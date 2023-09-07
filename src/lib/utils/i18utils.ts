import { locale } from '$lib/translations';
import { get } from 'svelte/store';

// LOCALE
export const getGenderOptions = () => {
	const l = get(locale);
	const genderOpts = {
		en: { Male: 'Male', Female: 'Female', Other: 'Other' },
		es: { Male: 'Hombre', Female: 'Mujer', Other: 'Otro' }
	};
	// complete function to retun the correct option based on locale and if it does not exist return the default english
	return genderOpts[l] || genderOpts.en;
};
