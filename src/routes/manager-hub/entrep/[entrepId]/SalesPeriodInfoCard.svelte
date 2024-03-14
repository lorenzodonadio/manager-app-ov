<script lang="ts">
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import type { ManagerSupplies } from '$lib/types/sbTypes';
	export let latestTransaction: ManagerSupplies;
	export let availableFilters: number;
	export let filtersSold: number;
</script>

<div class="card p-2 sm:p-3">
	<h4 class="h4 pb-1">Periodo de ventas en curso</h4>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-1">
		<p class="font-semibold">Entrega:</p>
		<p class="md:col-span-3">
			{latestTransaction.quantity}
			{translateSup(latestTransaction.item)}
		</p>
		<p class="font-semibold">Ventas en este periodo:</p>
		<p class="md:col-span-3">
			{filtersSold}
		</p>

		<p class="font-semibold">Filtros disponibles:</p>
		<p class="md:col-span-3">
			{availableFilters}
		</p>

		<p class="font-semibold">Desde:</p>
		<p class="md:col-span-3">
			{parseDateToMonthDayYear(latestTransaction.transaction_date)}
		</p>
		<p class="font-semibold">Hasta:</p>
		<p class="md:col-span-3">
			{parseDateToMonthDayYear(latestTransaction.schedule_check_date)}
		</p>
	</div>
</div>
