<script lang="ts">
	import { locale } from '$lib/translations';
	import { passwordStrength } from 'check-password-strength';

	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: string;
	export let grayLabel = false;
	export let disabled = false;
	export let isValid = false;

	const MIN_LEN = 8;
	const customOptions = [
		{
			id: 1,
			value: $locale === 'es' ? 'Débil' : 'Weak',
			minDiversity: 1,
			minLength: 6
		},
		{
			id: 2,
			value: $locale === 'es' ? 'Media' : 'Medium',
			minDiversity: 2,
			minLength: 8
		},
		{
			id: 3,
			value: $locale === 'es' ? 'Fuerte' : 'Strong',
			minDiversity: 3,
			minLength: 10
		}
	];

	let pwdStrength: string | undefined;
	let pwdId: number | undefined;

	$: if (value) {
		isValid = value.length >= MIN_LEN;
		const tmp = passwordStrength(value, customOptions);
		pwdStrength = tmp.value;
		pwdId = tmp.id;
	}
</script>

<div class="field col-span-6 relative" style="--colSpan: {colSpan}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label on:click|preventDefault for={label} class="label">{label}</label>

	<input
		on:change
		bind:value
		{placeholder}
		{disabled}
		type="password"
		name={label}
		id={label}
		autocomplete="new-password"
		class="input"
	/>
	{#if value.length > 0 && value.length < MIN_LEN}
		<p class="text-darkblue-900 text-sm">Password must be minimum 8 characters</p>
	{:else if pwdStrength}
		<p class="text-darkblue-900 text-sm">
			Password strength: <span
				class="{pwdId === 1
					? 'text-red-500'
					: pwdId === 2
					? 'text-yellow-500'
					: 'text-green-500'} font-semibold"
			>
				{pwdStrength}</span
			>
		</p>
	{/if}
	<div class="absolute top-2 right-3">
		<slot name="svg" />
	</div>
</div>

<style lang="postcss">
	@media (min-width: 640px) {
		.field {
			grid-column: span var(--colSpan) / span var(--colSpan);
		}
	}
</style>
