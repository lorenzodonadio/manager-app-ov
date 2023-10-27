<script lang="ts">
	import FirstCheckTransaction from './FirstCheckTransaction.svelte';
	import SecondCheckTransaction from './SecondCheckTransaction.svelte';
	import CompletedTransaction from './CompletedTransaction.svelte';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import type { ManagerSupplies } from '$lib/types/sbTypes';

	export let st: ManagerSupplies;
	export let avFilters: number;

	const areSalesComplete = avFilters <= 0;

	$: inventCheck = st.inventory_checks ? st.inventory_checks : null;
</script>

<li class="md:flex justify-between border-2 rounded-xl border-surface-300-600-token px-2 py-1">
	<div class="space-y-0.5">
		<h5 class="h5">{translateSup(st.type)} - {st.quantity} {translateSup(st.item)}</h5>
		<p class="">Fecha de envio: {parseDateToMonthDayYear(st.transaction_date)}</p>
		<p class="line-clamp-5">Notas: {st.notes}</p>
	</div>
	<div class="space-y-0.5 border-t md:border-t-0 border-surface-300-600-token md:w-96 lg:w-[450px]">
		{#if !inventCheck}
			<FirstCheckTransaction {st} {areSalesComplete} />
		{:else if inventCheck.is_completed}
			<CompletedTransaction {inventCheck} />
		{:else}
			<SecondCheckTransaction {st} {inventCheck} {areSalesComplete} />
		{/if}
	</div>
</li>
