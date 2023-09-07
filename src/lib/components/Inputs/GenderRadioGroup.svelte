<script lang="ts">
	import RadioGroup from '$lib/components/Inputs/RadioGroup.svelte';
	import { locale, t } from '$lib/translations';
	import { getGenderOptions } from '$lib/utils/i18utils';

	const genderLabel = getGenderOptions();

	export let value: string | undefined;
	export let disabled = false;
	export let title = $t('profile.gender');
	export let horizontal = true;
	// $: genderLabel = $locale === 'es' ? ['Hombre', 'Mujer', 'Otro'] : ['Male', 'Female', 'Other'];
</script>

<RadioGroup
	{disabled}
	{horizontal}
	{title}
	bind:value
	labels={Object.values(genderLabel)}
	options={Object.keys(genderLabel)}
/>
