<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: any;
	export let disabled = false;
	$: if (value) {
		// Step 1: remove all invalid characters
		value = value.replace(/[^0-9\-+]/g, '');
	}
</script>

<div class:opacity-80={disabled} class="field col-span-6 relative" style="--colSpan: {colSpan}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label for={label} class="label mb-1"
		><span>
			{label}
		</span>
	</label>
	<input
		on:change
		bind:value
		{placeholder}
		{disabled}
		type="tel"
		name={label}
		id={label}
		class="input block w-full"
	/>
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
