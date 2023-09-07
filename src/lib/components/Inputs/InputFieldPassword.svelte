<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: any;
	export let disabled = false;
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
		autocomplete="password"
		class="input"
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
