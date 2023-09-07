<script lang="ts">
	import { POSSIBLE_QTY } from '$lib/utils/constants';
	export let quantity: number | null | undefined;
	export let possibleQ = POSSIBLE_QTY;
</script>

<div class="min-w-[452px] flex w-full justify-around">
	{#each possibleQ as qty}
		<button
			on:click={() => (quantity = qty)}
			class="card text-lg font-semibold btn p-4 py-3 w-14 {quantity === qty
				? 'bg-gradient-to-tr from-primary-500 to-secondary-600'
				: 'opacity-80 bg-transparent'}">{qty}</button
		>
	{/each}
</div>
