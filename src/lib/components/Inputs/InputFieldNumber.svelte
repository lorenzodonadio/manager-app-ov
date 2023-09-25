<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: any;
	export let step = 1;
	export let units: string | null = null;
	export let max: string | number | null | undefined = undefined;
	export let min: string | number | null | undefined = 0;
	export let disabled = false;
	export let name: string | null = null;

	let input: HTMLInputElement;
	let validationMessage = '';
</script>

<div class:opacity-60={disabled} class="field col-span-6 relative" style="--colSpan: {colSpan}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label for={label} class="label mb-1 capitalize">{label}</label>

	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
		<input
			bind:this={input}
			on:input={() => (validationMessage = input.validationMessage)}
			on:change
			bind:value
			{placeholder}
			{disabled}
			{step}
			type="number"
			id={label}
			class="{validationMessage != ''
				? 'focus:ring-red-500 focus:border-red-500 border-red-300'
				: ''} input w-full"
			{min}
			{max}
		/>
		{#if units}
			<div class="input-group-shim">
				<span class="my-auto mx-auto truncate">{@html units}</span>
			</div>
		{/if}
	</div>
	{#if input?.validationMessage}
		<span class="text-red-500">{input.validationMessage}</span>
	{/if}
	<div class="absolute top-2 right-3">
		<slot name="svg" />
	</div>
	{#if units}
		<div
			class="flex absolute {label === ''
				? 'top-[4.5px]'
				: 'top-[28.5px]'} right-[0.5px] border-gray-300 bg-surface-100-800-token w-14 h-10 rounded-r-2xl"
		>
			<span class="my-auto mx-auto truncate">{@html units}</span>
		</div>
	{/if}
</div>

<style lang="postcss">
	@media (min-width: 640px) {
		.field {
			grid-column: span var(--colSpan) / span var(--colSpan);
		}
	}
</style>
