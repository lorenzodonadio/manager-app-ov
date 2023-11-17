<script lang="ts">
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import type { InventoryCheck } from '$lib/types/sbTypes';
	import StartsInput from '$lib/components/StartsInput.svelte';

	export let inventCheck: InventoryCheck['Row'];
</script>

<div class="flex justify-between">
	<!-- <span class="my-auto text-green-500"><SolidCheckSvg /></span> -->
	<h5 class="h5">Chequeo de inventario existoso</h5>
	{#if inventCheck.rating}
		<StartsInput stars={inventCheck.rating} readOnly={true} size={16} />
	{/if}
</div>
<div class="flex space-x-2 my-auto">
	<p>{parseDateToMonthDayYear(inventCheck.actual_check_date)}</p>
	{#if inventCheck.extension_granted}
		<p class="text-sm badge variant-ringed-tertiary">Plazo Extendido</p>
	{/if}
</div>
<div class="flex justify-between">
	<p class="line-clamp-5">Notas: {inventCheck.notes}</p>

	<p>Bonus: {inventCheck.granted_bonus ?? '-'} {inventCheck.bonus_currency ?? ''}</p>
</div>
