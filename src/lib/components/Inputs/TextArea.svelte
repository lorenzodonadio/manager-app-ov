<script lang="ts">
	export let rows = 4;
	export let label = '';
	export let value: string | null | undefined = '';
	export let colSpan: number | string = 3;
	export let placeholder: string = '';
	export let disabled = false;
</script>

<div class="field col-span-6 relative" style="--colSpan: {colSpan}">
	{#if label}
		<label for="textarea{label}" class="label">{label}</label>
	{/if}
	{#if disabled}
		<p class="text-gray-500 p-2">{value}</p>
	{:else}
		<textarea
			on:change
			style="font-size: 10pt"
			{placeholder}
			{rows}
			bind:value
			name="textarea"
			id="textarea{label}"
			class="input"
		/>
	{/if}
</div>

<style lang="postcss">
	@media (min-width: 640px) {
		.field {
			grid-column: span var(--colSpan) / span var(--colSpan);
		}
	}
</style>
