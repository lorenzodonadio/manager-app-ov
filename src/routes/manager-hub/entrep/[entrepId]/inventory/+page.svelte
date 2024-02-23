<script lang="ts">
	import type { ManagerSupplies } from '$lib/types/sbTypes';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { PageData } from './$types';
	import SupplyTransactionLi from './SupplyTransactionLi.svelte';
	import GiveFiltersModal from './GiveFiltersModal.svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { t } from '$lib/translations';
	export let data: PageData;
	const supabase = data.supabase;
	let avFilters = data.availableFilters;
	let showGiveFiltersModal = false;
	$: disabledSupplies = avFilters <= 0 ? false : !data.entrepProfile.isTransactionComplete;

	const markRequestAsComplete = async (inventReqId: string | null | undefined) => {
		if (!inventReqId) return;

		const { data: _d, error } = await supabase
			.from('inventory_request')
			.update({ is_completed: true })
			.match({ id: inventReqId });
		if (error) return errorToast('Error completando pedido, contactanos info@openversum.com');
		data.entrepProfile.inventory_request = undefined;
		invalidate(`entrep:${$page.params.entrepId}`);
		return successToast('Pedido completado con exito');
	};

	const sendSuppliesNotification = async (userId: string) => {
		const { data: _d, error } = await supabase.from('notification').insert({
			user_id: userId,
			type: 'NEW_SUPPLIES',
			sent_by: data.session?.user.id
		});
	};
	const handleGiveComplete = (newT: ManagerSupplies) => {
		avFilters += newT.quantity;
		markRequestAsComplete(data.entrepProfile.inventory_request?.id);
		sendSuppliesNotification($page.params.entrepId);
		// data.supplyTransactions = [newT, ...data.supplyTransactions];
		// data.entrepProfile.isTransactionComplete = true;
		invalidate(`entrep:${$page.params.entrepId}`);
		invalidate('managerhub:root');
		showGiveFiltersModal = false;
	};

	console.log(data.supplyTransactions);
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
		entrepLevel={data.entrepLevel}
	/>
{/if}

<div class="card p-1 sm:p-3">
	<div class="space-y-2">
		<h5 class="h5">{$t('invent.inventory')}</h5>
		<div class="flex justify-between">
			<p class="transition-all">{$t('invent.availableFilters')} <strong>{avFilters}</strong></p>
			<button
				disabled={disabledSupplies}
				class:opacity-70={disabledSupplies}
				class="btn btn-sm variant-ghost-primary"
				on:click={() => (showGiveFiltersModal = true)}>{$t('invent.addFilterDelivery')}</button
			>
		</div>
		{#if !data.entrepProfile.isTransactionComplete}
			<p class="text-sm py-1">
				{$t('invent.inventoryCheckNotice1')}
			</p>
			<p class="text-sm py-1">
				{$t('invent.inventoryCheckNotice2')}
			</p>
		{/if}
	</div>
	{#if data.entrepProfile.inventory_request}
		<div class="">
			<div class="my-auto space-y-2">
				<p class="badge variant-ringed-secondary">
					{$t('invent.filterRequest', { quantity: data.entrepProfile.inventory_request.quantity })}
				</p>
				<p>{$t('invent.notes')}: {data.entrepProfile.inventory_request.notes}</p>
				<p>
					{$t('invent.date')}: {parseDateToMonthDayYear(
						data.entrepProfile.inventory_request.created_at
					)}
				</p>
			</div>
		</div>
	{/if}

	<h6 class="h6 mt-4 border-t py-1">{$t('invent.inventoryHistory')}</h6>
	<ul class="max-h-96 overflow-y-auto space-y-2">
		{#each data.supplyTransactions as st}
			<SupplyTransactionLi avFilters={data.availableFilters} {st} />
		{/each}
	</ul>
</div>
