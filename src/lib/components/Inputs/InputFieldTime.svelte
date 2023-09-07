<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let colSpan: number | string = 3;
	export let value: any;
	export let disabled = false;
</script>

<div class:opacity-60={disabled} class="field col-span-6 relative" style="--colSpan: {colSpan}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<label on:click|preventDefault for="date-time" class="label">{label}</label>

	<input
		bind:value
		{placeholder}
		{disabled}
		type="time"
		name="date-time"
		id="date-time"
		class="focus:ring-darkblue-500 focus:border-darkblue-500 block w-full shadow-sm border-gray-300 rounded-md"
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
