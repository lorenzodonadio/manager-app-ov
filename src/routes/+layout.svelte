<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { loadTranslations, locale, t } from '$lib/translations';
	import lang from '$lib/translations/lang.json';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	import type { Subscription } from '@supabase/supabase-js';
	export let data;
	initializeStores();
	const possibleLocales = Object.keys(lang);
	let loaded = false;
	//+src/layout.svelte
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let subscription: Subscription;
	onMount(async () => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		subscription = data.subscription;
		//i18n stuff https://www.npmjs.com/package/sveltekit-i18n
		const navLang = navigator.language.split('-')[0];
		const defaultLocale = possibleLocales.includes(navLang) ? navLang : 'en';
		const initLocale = locale.get() || defaultLocale; // set default if no locale already set
		await loadTranslations(initLocale, '/'); // keep this just before the `return`
		loaded = true;
	});

	onDestroy(() => {
		if (subscription) subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Manager App - Openversum - providing clean and safe drinking water where most needed</title
	>
	<meta
		name="description"
		content="Technology and educational platform to enable and empower local entrepreneurs to produce and distribute innovative drinking water filters. Entrepreneurs make a living by bringing clean water to their communities."
	/>
	<meta
		name="description"
		content="Plataforma tecnológica y educativa para capacitar y empoderar a los empresarios locales para que produzcan y distribuyan filtros de agua potable innovadores. Los empresarios se ganan la vida llevando agua limpia a sus comunidades."
	/>
</svelte:head>

<Toaster position="top-center" />
<Modal />
<div class="dark:bg-surface-900 h-full">
	{#if loaded}
		<slot />
	{:else}
		<div class=" flex w-full h-full justify-center items-center animate-pulse">
			<OvLogo />
		</div>
	{/if}
</div>
