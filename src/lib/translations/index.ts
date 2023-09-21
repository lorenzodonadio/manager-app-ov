import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
	translations: {
		en: { lang },
		es: { lang }
	},
	loaders: [
		// ENGLISH!!!!
		{
			locale: 'en',
			key: 'auth',
			loader: async () => (await import('./en/auth.json')).default
		},
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},

		{
			locale: 'en',
			key: 'home',
			// routes: ['/'],
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'en',
			key: 'saleQ',
			// routes: ['/'],
			loader: async () => (await import('./en/saleQuestions.json')).default
		},
		{
			locale: 'en',
			key: 'waterQ',
			// routes: ['/'],
			loader: async () => (await import('./en/waterQuestions.json')).default
		},
		{
			locale: 'en',
			key: 'entrepQ',
			// routes: ['/'],
			loader: async () => (await import('./en/entrepQuestions.json')).default
		},
		{
			locale: 'en',
			key: 'profile',
			// routes: ['/'],
			loader: async () => (await import('./en/profile.json')).default
		},
		{
			locale: 'en',
			key: 'yoursales',
			// routes: ['/'],
			loader: async () => (await import('./en/yourSales.json')).default
		},
		{
			locale: 'en',
			key: 'manager',
			// routes: ['/'],
			loader: async () => (await import('./en/manager.json')).default
		},
		{
			locale: 'en',
			key: 'invent',
			// routes: ['/'],
			loader: async () => (await import('./en/inventory.json')).default
		},
		{
			locale: 'en',
			key: 'pwReset',
			// routes: ['/'],
			loader: async () => (await import('./en/passwordReset.json')).default
		},
		// SPANISH!!!!
		{
			locale: 'es',
			key: 'auth',
			loader: async () => (await import('./es/auth.json')).default
		},
		{
			locale: 'es',
			key: 'common',
			loader: async () => (await import('./es/common.json')).default
		},

		{
			locale: 'es',
			key: 'home',
			// routes: ['/'],
			loader: async () => (await import('./es/home.json')).default
		},
		{
			locale: 'es',
			key: 'saleQ',
			// routes: ['/'],
			loader: async () => (await import('./es/saleQuestions.json')).default
		},
		{
			locale: 'es',
			key: 'waterQ',
			// routes: ['/'],
			loader: async () => (await import('./es/waterQuestions.json')).default
		},
		{
			locale: 'es',
			key: 'entrepQ',
			// routes: ['/'],
			loader: async () => (await import('./es/entrepQuestions.json')).default
		},

		{
			locale: 'es',
			key: 'profile',
			// routes: ['/'],
			loader: async () => (await import('./es/profile.json')).default
		},

		{
			locale: 'es',
			key: 'yoursales',
			// routes: ['/'],
			loader: async () => (await import('./es/yourSales.json')).default
		},
		{
			locale: 'es',
			key: 'manager',
			// routes: ['/'],
			loader: async () => (await import('./es/manager.json')).default
		},
		{
			locale: 'es',
			key: 'invent',
			// routes: ['/'],
			loader: async () => (await import('./es/inventory.json')).default
		},
		{
			locale: 'es',
			key: 'pwReset',
			// routes: ['/'],
			loader: async () => (await import('./es/passwordReset.json')).default
		}
	]
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
