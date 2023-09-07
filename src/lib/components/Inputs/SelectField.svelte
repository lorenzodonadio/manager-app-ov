<script lang="ts">
	export let label = '';
	export let colSpan: number | string = 3;
	export let options: string[];
	export let value: any;
	export let emptyText = 'Select your option';
	export let disabled = false;
	export let setFirstOptionAsValue = false;

	if (setFirstOptionAsValue) {
		value = options[0];
	}
</script>

<!-- class:opacity-60={disabled} -->
<div class:opacity-80={disabled} class="field col-span-6 relative " style="--colSpan: {colSpan}">
	{#if label}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<label on:click|preventDefault for="textinput" class="label">
			<span>
				{label}
			</span>
		</label>
	{/if}
	<select on:change bind:value {disabled} id="select-field" name="select-field" class="select ">
		<option value="" disabled selected={value === ''}>{emptyText}</option>
		{#each options as opt}
			<!-- <option value={opt}>{opt}</option> -->
			<option selected={value === opt} value={opt}>
				{opt}
			</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	@media (min-width: 640px) {
		.field {
			grid-column: span var(--colSpan) / span var(--colSpan);
		}
	}
</style>
