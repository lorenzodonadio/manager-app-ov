<script lang="ts">
	import { daysUntil, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { warnToast } from '$lib/utils/toasts';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { ManagerSupplies } from '$lib/types/sbTypes';
	import { translateSup } from '$lib/translations/suppliesTranslations';

	export let supabase: SupabaseClient<Database>;
	export let st: ManagerSupplies;
	export let totSales: number;
	const getInventCheck = (st: ManagerSupplies) => {
		if (st.inventory_checks && st.inventory_checks.length > 0) return st.inventory_checks[0];
		return null;
	};
	const isTimeForCheck = (daysUntil(st.schedule_check_date) ?? 0) <= 7;
	const areSalesComplete = totSales >= st.quantity;

	let showCheckModal = false;
	// 	type InventCheck = {
	//     actual_check_date: string | null;
	//     entrep_id: string;
	//     extension_granted: boolean | null;
	//     id: string;
	//     is_completed: boolean | null;
	//     manager_id: string;
	//     notes: string | null;
	//     second_check_date: string | null;
	// } | null
	let inventCheck = getInventCheck(st);

	const handleYes = async () => {
		if (!inventCheck) return;
		await supabase
			.from('inventory_checks')
			.update({ is_completed: true })
			.match({ id: inventCheck.id });
		showCheckModal = false;
	};

	const handleNo = () => {
		warnToast('Es necesario que todos los filtros se hayan vendido');
	};
</script>

{#if showCheckModal}
	<SlotModalTitle on:closeModal={() => (showCheckModal = false)} title="Chequeo de inventario">
		<div class="space-y-1">
			<p>Ventas de filtros</p>
			<h5>Se vendieron todos los {st.quantity} {translateSup(st.item)}?</h5>
			<p>Agendado para el: {parseDateToMonthDayYear(st.schedule_check_date)}</p>
			<div class="flex justify-between pt-2">
				<button on:click={handleNo} class="btn btn-sm variant-ghost-warning">No</button>
				<button on:click={handleYes} class="btn btn-sm variant-ghost-primary">Yes</button>
			</div>
		</div>
	</SlotModalTitle>
{/if}

<li class="flex justify-between border rounded-xl border-surface-300-600-token px-2 py-1">
	<div class="space-y-1">
		<h6 class="h6">{translateSup(st.type)} - {st.quantity} {translateSup(st.item)}</h6>
		{#if inventCheck}
			<p>{inventCheck.is_completed}</p>
			<p>Notas: {inventCheck.notes}</p>
			<p>Extension: {inventCheck.extension_granted}</p>
			<!-- <p>Extension: {inventCheck.}</p> -->
		{:else}
			<p class="">Chequeo de inventario: {parseDateToMonthDayYear(st.schedule_check_date)}</p>

			<button
				disabled={!isTimeForCheck && !areSalesComplete}
				on:click={() => (showCheckModal = true)}
				class="btn btn-sm variant-ghost-primary">Realizar Chequeo</button
			>
		{/if}
	</div>
	<div class="">
		<p class="text-sm">Notas: {st.notes}</p>
		<p class="text-sm">Fecha de envio: {parseDateToMonthDayYear(st.transaction_date)}</p>
	</div>
</li>
