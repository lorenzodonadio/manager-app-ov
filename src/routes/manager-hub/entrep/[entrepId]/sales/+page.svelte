<script lang="ts">
	import { t } from '$lib/translations';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;
	import SaleLi from './SaleLi.svelte';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';

	const sales = data.entrepSales ?? [];
	const areSalesActive = !data.entrepProfile.isTransactionComplete;
	let showAllSales = areSalesActive ? false : true;
	$: salesToShow = showAllSales ? sales : data.currentSales;
</script>

<div class="flex justify-between py-2 h-16">
	<div class="">
		{#if areSalesActive && !showAllSales}
			{#if data.entrepProfile.latestTransaction}
				<div class="flex space-x-4">
					<p class="p">
						Desde: <strong
							>{parseDateToMonthDayYear(
								data.entrepProfile.latestTransaction.transaction_date
							)}</strong
						>
					</p>
					<p class="p">
						Hasta:<strong
							>{parseDateToMonthDayYear(
								data.entrepProfile.latestTransaction.schedule_check_date
							)}</strong
						>
					</p>
				</div>
			{/if}
			<p class="p">
				Ventas en este periodo: <strong>{data.currentTotalSales}</strong>
			</p>
		{/if}
	</div>

	<div class="my-auto w-52 flex">
		<SlideToggle size="sm" name="slider-label" bind:checked={showAllSales}
			><span class="text-xs whitespace-nowrap"
				>{showAllSales ? 'Todas las ventas' : 'Ventas en curso'}</span
			></SlideToggle
		>
	</div>
</div>

<div class="max-h-96 overflow-y-auto card p-1 sm:p-3">
	<h5 class="h5">Ventas Totales: {data.totFilterSales}</h5>

	{#if salesToShow && salesToShow?.length > 0}
		<ul class="max-h-96 overflow-y-auto space-y-2">
			{#each salesToShow as sale}
				<SaleLi {sale} />
			{/each}
		</ul>
	{:else}
		<p>{$t('manager.nosales')}</p>
	{/if}
</div>
