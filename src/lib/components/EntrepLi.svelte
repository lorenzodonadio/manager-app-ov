<script lang="ts">
	// import { locations } from '$lib/stores/locationsStore';
	// import { managerSupplies } from '$lib/stores/managerSuppliesStore';
	import type { EntrepProfile, Profiles, Locations } from '$lib/types/sbTypes';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';

	export let entrep: EntrepProfile;
	export let manager: Profiles['Row'] | undefined;
	export let location: Locations['Row'] | undefined;
	const name = `${entrep.first_name ?? ''} ${entrep.last_name ?? ''}`;
</script>

<li class="py-1">
	<a class="flex justify-between w-full space-x-2" href="/manager-hub/entrep/{entrep.id}">
		<div class="flex gap-2 flex-wrap justify-between w-2/3">
			<div class="">
				<p>{name}</p>
				<p>{entrep.email}</p>
			</div>

			{#if entrep.inventory_request}
				<div class="my-auto">
					<p class="badge variant-ringed-secondary">
						Pedido de {entrep.inventory_request.quantity} Filtros
					</p>
				</div>
			{/if}

			{#if entrep.latestTransaction}
				{#if entrep.isTransactionComplete}
					<div class="my-auto">
						<p class="badge variant-ringed-warning">Emprendedor inactivo</p>
						<p class="text-sm">
							Ultimo pedido: {parseDateToMonthDayYear(entrep.latestTransaction.transaction_date)}
						</p>
						<p class="text-sm">
							Entrega: {entrep.latestTransaction.quantity}
							{entrep.latestTransaction.item}
						</p>
					</div>
				{:else}
					<div class="my-auto">
						<p class="badge variant-ringed-success">Periodo de ventas en curso</p>
						<p class="text-sm">
							Desde: {parseDateToMonthDayYear(entrep.latestTransaction.transaction_date)}
						</p>
						<p class="text-sm">
							Hasta: {parseDateToMonthDayYear(entrep.latestTransaction.schedule_check_date)}
						</p>
						<p class="text-sm">
							Entrega: {entrep.latestTransaction.quantity}
							{entrep.latestTransaction.item}
						</p>
					</div>
				{/if}
			{/if}
		</div>
		<div class="">
			{#if location}
				<p class="text-sm sm:text-base p">{location.display_name}</p>
			{/if}

			{#if manager}
				<p class="text-sm pt-0.5">Manager: {manager.first_name ?? ''} {manager.last_name ?? ''}</p>
			{/if}
		</div>
	</a>
</li>
