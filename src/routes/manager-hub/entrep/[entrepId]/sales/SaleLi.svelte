<script lang="ts">
	import type { FilterSales } from '$lib/types/sbTypes';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';

	export let sale: FilterSales['Row'];
</script>

<li
	class="flex justify-between border p-1 border-surface-400-500-token bg-surface-300-600-token rounded-xl"
>
	<div class="">
		<p>Numero de filtros:{sale.number_sold}</p>
		<p>Valor: {sale.price} {sale.currency}</p>
	</div>
	<div class=""><p>{parseDateToMonthDayYear(sale.created_at)}</p></div>
</li>
