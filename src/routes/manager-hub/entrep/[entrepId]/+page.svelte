<script lang="ts">
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	export let data;
</script>

<div class="space-y-2 sm:space-y-4">
	<div class="card p-1 sm:p-3">
		<h5 class="h5">Datos del emprendedor:</h5>
		{#if data.location}
			<p class="p text-sm">Lugar: {data.location.display_name}</p>
		{/if}
		<p class="p text-sm">
			<span> Telefono: </span>
			<a class="underline" href="tel://{data.entrepProfile.phone}">{data.entrepProfile.phone}</a>
		</p>
		<p class="p text-sm">Email: {data.entrepProfile.email}</p>
		<!-- <p class="p text-sm">Edad: {data.entrepProfile.age_year ?? '-'}</p> -->
		{#if data.entrepProfile.created_at}
			<p class="p text-sm">Desde: {new Date(data.entrepProfile.created_at).toLocaleDateString()}</p>
		{/if}
	</div>
	{#if data.entrepProfile.latestTransaction && !data.entrepProfile.isTransactionComplete}
		<div class="card p-2 sm:p-3">
			<h4 class="h4">Periodo de ventas en curso</h4>
			<p>
				Entrega: <strong
					>{data.entrepProfile.latestTransaction.quantity}
					{translateSup(data.entrepProfile.latestTransaction.item)}</strong
				>
			</p>
			<p>
				Ventas en este periodo: <strong
					>{data.currentSales.reduce((p, c) => c.number_sold + p, 0)}</strong
				>
			</p>
			<p class="transition-all">Filtros disponibles: <strong>{data.availableFilters}</strong></p>

			<div class="flex space-x-4">
				<p class="text-sm">
					Desde: {parseDateToMonthDayYear(data.entrepProfile.latestTransaction.transaction_date)}
				</p>
				<p class="text-sm">
					Hasta: {parseDateToMonthDayYear(data.entrepProfile.latestTransaction.schedule_check_date)}
				</p>
			</div>
		</div>
	{/if}
</div>
