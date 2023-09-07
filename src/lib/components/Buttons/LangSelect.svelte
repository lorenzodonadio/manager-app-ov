<script lang="ts">
	import { loading, locale } from '$lib/translations';

	import TranslateSvg from '../SVG/TranslateSVG.svelte';
	import lang from '$lib/translations/lang.json';
	let value = locale.get();
	const possibleLocales = Object.keys(lang);
</script>

<div class="h-full my-auto mr-1">
	<TranslateSvg />
</div>
<select
	bind:value
	on:change={(e) => locale.set(value)}
	id="lang"
	name="lang"
	class="select w-20 variant-primary bg-white"
>
	<!-- class="select w-16 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" -->
	{#each possibleLocales as opt}
		<option class="font-sans" value={opt}>{opt}</option>
	{/each}
</select>
