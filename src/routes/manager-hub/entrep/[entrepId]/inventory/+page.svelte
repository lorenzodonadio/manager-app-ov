<script lang="ts">
	import type { ManagerSupplies } from '$lib/types/sbTypes';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { PageData } from './$types';
	import SupplyTransactionLi from './SupplyTransactionLi.svelte';
	import GiveFiltersModal from './GiveFiltersModal.svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	export let data: PageData;
	const supabase = data.supabase;
	let avFilters = data.availibleFilters;
	let showGiveFiltersModal = false;
	const markRequestAsComplete = async (inventReqId: string | null | undefined) => {
		if (!inventReqId) return;

		const { data: _d, error } = await supabase
			.from('inventory_request')
			.update({ is_completed: true })
			.match({ id: inventReqId });
		if (error) return errorToast('Error completando pedido, contactanos info@openversum.com');
		data.entrepProfile.inventory_request = undefined;
		invalidate(`entrep:${$page.data.entrepId}`);
		return successToast('Pedido completado con exito');
	};

	const handleGiveComplete = (newT: ManagerSupplies) => {
		// avFilters += newT.quantity;
		markRequestAsComplete(data.entrepProfile.inventory_request?.id);
		// data.supplyTransactions = [newT, ...data.supplyTransactions];
		// data.entrepProfile.isTransactionComplete = true;
		showGiveFiltersModal = false;
	};
</script>

{#if showGiveFiltersModal}
	<GiveFiltersModal
		on:completed={(e) => handleGiveComplete(e.detail)}
		on:closeModal={() => (showGiveFiltersModal = false)}
		initialQ={data.entrepProfile.inventory_request?.quantity}
		entrepId={$page.params.entrepId}
		name={data.entrepProfile.first_name ?? ''}
		managerId={data.session?.user.id ?? ''}
		supabase={data.supabase}
	/>
{/if}

<div class="card p-1 sm:p-3">
	<div class="flex justify-between my-auto">
		<div class="space-y-2">
			<h5 class="h5">Inventario:</h5>
			<p class="transition-all">Filtros disponibles: <strong>{avFilters}</strong></p>
			<div class="">
				<!-- isTransactionComplete: means latest transaction complete,
					so if its true it means the entrepreneur can receive more inventory,
					if its false we disable the inventory sending -->
				<button
					disabled={!data.entrepProfile.isTransactionComplete}
					class:opacity-70={!data.entrepProfile.isTransactionComplete}
					class="btn btn-sm variant-ghost-primary"
					on:click={() => (showGiveFiltersModal = true)}>+ Entrega de Filtros</button
				>
				{#if !data.entrepProfile.isTransactionComplete}
					<p class="text-sm py-1">
						Se debe realizar el chequeo de inventario para poder efectuar la proxima entrega de
						filtros
					</p>
				{/if}
			</div>
		</div>
		<div class="">
			{#if data.entrepProfile.inventory_request}
				<div class="my-auto space-y-2">
					<p class="badge variant-ringed-secondary">
						Pedido de {data.entrepProfile.inventory_request.quantity} Filtros
					</p>
					<p>Notas: {data.entrepProfile.inventory_request.notes}</p>
					<p>Fecha: {parseDateToMonthDayYear(data.entrepProfile.inventory_request.created_at)}</p>
				</div>
			{/if}
		</div>
	</div>

	<h6 class="h6 mt-4 border-t py-1">Historial de Inventario:</h6>
	<ul class="max-h-96 overflow-y-auto space-y-2">
		{#each data.supplyTransactions as st}
			<SupplyTransactionLi {st} {supabase} />
		{/each}
	</ul>
</div>
