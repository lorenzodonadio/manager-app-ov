<script lang="ts">
	import { matchEmail } from '$lib/utils/regex';

	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: any;
	export let disabled = false;
	export let isValid: boolean | null = null;

	isValid = matchEmail(value);
	$: if (value) {
		isValid = matchEmail(value);
	} else {
		isValid = null;
	}
</script>

<div class="field col-span-6 relative" style="--colSpan: {colSpan}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label for={label} class="label mb-1 capitalize">{label}</label>

	<input
		on:change
		bind:value
		{placeholder}
		{disabled}
		type="email"
		name={label}
		id={label}
		autocomplete="email"
		class="input"
	/>
	<div class="absolute top-2 right-3">
		<slot name="svg" />
	</div>
	{#if isValid === false}
		<span class="text-sm text-red-500">Please enter a valid email</span>
	{/if}
</div>

<style lang="postcss">
	@media (min-width: 640px) {
		.field {
			grid-column: span var(--colSpan) / span var(--colSpan);
		}
	}
</style>
