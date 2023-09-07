<script lang="ts">
	import { DEFAULT_COUNTRY } from '$lib/utils/constants';
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type {
		DetailedValue,
		E164Number,
		CountryCode,
		TelInputOptions
	} from 'svelte-tel-input/types';

	// E164 formatted value, usually you should store and use this.
	export let value: E164Number | null;

	// Selected country
	export let country: CountryCode | null = DEFAULT_COUNTRY;
	// Validity
	export let valid: boolean;

	// Phone number details
	export let detailedValue: DetailedValue | null = null;

	// export let options: TelInputOptions = { invalidateOnCountryChange: true };
	export let options: TelInputOptions;

	export let label: string | null;

	export let required = false;
</script>

{#if label}
	<label for="country-select-{label}" class="label mb-1"><span>{label}</span> </label>
{/if}
<div class="flex rounded-xl {valid ? '' : 'border border-red-500'}">
	<select
		{required}
		id="country-select-{label}"
		class="input rounded-r-none w-32 text-sm pr-1"
		aria-label="Default select example"
		name="Country"
		bind:value={country}
	>
		<option value={null} hidden={country !== null}>Please select</option>
		{#each normalizedCountries as currentCountry (currentCountry.id)}
			{@const shortName = currentCountry.name.split('(')[0]}
			<option
				value={currentCountry.iso2}
				selected={currentCountry.iso2 === country}
				aria-selected={currentCountry.iso2 === country}
			>
				{shortName} +{currentCountry.dialCode}
				<!-- <span class="text-xs">{shortName}</span> (+{currentCountry.dialCode}) -->
			</option>
		{/each}
	</select>

	<TelInput
		{options}
		bind:country
		bind:valid
		bind:value
		bind:detailedValue
		class="input rounded-l-none"
	/>
	<!-- class="input rounded-l-none {valid ? '' : 'border-2 border-red-600'}" -->
	<!-- class="px-4 py-1 w-full bg-gray-50 dark:bg-gray-700 
        dark:placeholder-gray-400 dark:text-white text-gray-900 focus:outline-none rounded-r-lg {valid
			? 'border border-gray-300 border-l-gray-100 dark:border-l-gray-700 dark:border-gray-600'
			: 'border-2 border-red-600'}" -->
</div>
{#if valid === false}
	<span class="text-sm text-red-500">Please enter a valid phone number</span>
{/if}
