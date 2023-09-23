<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import InventoryCheckModal from './InventoryCheckModal.svelte';
	import { daysUntil, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast, warnToast } from '$lib/utils/toasts';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { InventoryCheck, ManagerSupplies } from '$lib/types/sbTypes';
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import { invalidate } from '$app/navigation';
	// import SolidCheckSvg from '$lib/components/SVG/SolidCheckSVG.svelte';
	import SecondInventoryCheckModal from './SecondInventoryCheckModal.svelte';
	import StartsInput from '$lib/components/StartsInput.svelte';
	import { t } from '$lib/translations';
	const dispatch = createEventDispatcher();

	export let supabase: SupabaseClient<Database>;
	export let st: ManagerSupplies;
	export let avFilters: number;

	const isTimeForCheck = (daysUntil(st.schedule_check_date) ?? 0) <= 0;
	const areSalesComplete = avFilters <= 0;

	let showCheckModal = false;
	let showSecondCheckModal = false;

	$: inventCheck = st.inventory_checks ? st.inventory_checks : null;

	const insertInventoryCheck = async (newInvent: InventoryCheck['Insert']) => {
		const { data, error } = await supabase.from('inventory_checks').insert(newInvent);

		if (error) return errorToast(error.message);
		successToast($t('common.success'));
		invalidate('managerhub:root');
	};

	const upsertInventoryCheck = async (newInvent: InventoryCheck['Insert']) => {
		const { data, error } = await supabase.from('inventory_checks').upsert(newInvent);

		if (error) return errorToast(error.message);
		successToast($t('common.success'));
		invalidate('managerhub:root');
	};
</script>

<li class="md:flex justify-between border-2 rounded-xl border-surface-300-600-token px-2 py-1">
	{#if showCheckModal}
		<InventoryCheckModal
			on:success={(e) => {
				insertInventoryCheck(e.detail);
				showCheckModal = false;
			}}
			on:extension={(e) => {
				insertInventoryCheck(e.detail);
				showCheckModal = false;
			}}
			on:closeModal={() => (showCheckModal = false)}
			{st}
		/>
	{/if}

	{#if showSecondCheckModal && inventCheck}
		<SecondInventoryCheckModal
			{inventCheck}
			on:success={(e) => {
				upsertInventoryCheck(e.detail);
				showSecondCheckModal = false;
			}}
			on:failedCheck={() => {
				dispatch('failedSecondCheck');
				showSecondCheckModal = false;
			}}
			on:closeModal={() => (showSecondCheckModal = false)}
		/>
	{/if}

	<div class="space-y-0.5">
		<h5 class="h5">{translateSup(st.type)} - {st.quantity} {translateSup(st.item)}</h5>
		<p class="">Fecha de envio: {parseDateToMonthDayYear(st.transaction_date)}</p>
		<p class="line-clamp-5">Notas: {st.notes}</p>
	</div>
	<div class="space-y-0.5 border-t md:border-t-0 border-surface-300-600-token md:w-96 lg:w-[450px]">
		{#if inventCheck}
			{#if inventCheck.is_completed}
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
				<p class="line-clamp-5">Notas: {inventCheck.notes}</p>
			{:else}
				{@const isSecondDateReady = (daysUntil(inventCheck.second_check_date) ?? 0) <= 30}
				<p class="flex">Chequeo de inventario Extendido</p>
				<p>{parseDateToMonthDayYear(inventCheck.second_check_date)}</p>

				<div class="flex justify-center">
					<button
						disabled={!isSecondDateReady && !areSalesComplete}
						on:click={() => (showSecondCheckModal = true)}
						class="btn btn-sm variant-ghost-primary">Realizar Segundo Chequeo</button
					>
				</div>
			{/if}
		{:else}
			<p class="">Chequeo de inventario agendado</p>
			<p>{parseDateToMonthDayYear(st.schedule_check_date)}</p>
			<div class="flex justify-center">
				<button
					disabled={!isTimeForCheck && !areSalesComplete}
					on:click={() => (showCheckModal = true)}
					class="btn btn-sm variant-ghost-primary">Realizar Chequeo</button
				>
			</div>
		{/if}
	</div>
</li>
