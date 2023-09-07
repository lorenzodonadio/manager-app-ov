<script lang="ts">
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import type { ManagerSuppliesT } from '$lib/stores/managerSuppliesStore';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { warnToast } from '$lib/utils/toasts';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<Database>;
	export let st: ManagerSuppliesT;

	const getInventCheck = (st: ManagerSuppliesT) => {
		if (st.inventory_checks && st.inventory_checks.length > 0) return st.inventory_checks[0];
		return null;
	};
	let showCheckModal = false;
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
	<SlotModalTitle on:closeModal={() => (showCheckModal = false)} title="Chequeo inventario ">
		<div class="">
			<p>Agendado para el: {parseDateToMonthDayYear(st.schedule_check_date)}</p>
			<h5>Al dia de hoy Se vendieron {st.quantity} {st.item} ?</h5>
			<div class="flex justify-between">
				<button on:click={handleNo} class="btn btn-sm variant-ghost-warning">No</button>
				<button on:click={handleYes} class="btn btn-sm variant-ghost-primary">Yes</button>
			</div>
		</div>
	</SlotModalTitle>
{/if}

<li
	class="flex justify-between border rounded-xl border-surface-300-600-token bg-surface-300-600-token"
>
	<div class="">
		<p>{st.quantity} {st.item}</p>
		{#if inventCheck}
			<p>{inventCheck.is_completed}</p>
			<p>Notas: {inventCheck.notes}</p>
			<p>Extension: {inventCheck.extension_granted}</p>
			<p>Extension: {inventCheck.extension_granted}</p>
			<!-- <p>Extension: {inventCheck.}</p> -->
		{:else}
			<p class="">Chequeo de inventario: {parseDateToMonthDayYear(st.schedule_check_date)}</p>
			<button on:click={() => (showCheckModal = true)} class="btn btn-sm variant-ghost-primary"
				>Realizar Chequeo</button
			>
		{/if}
	</div>
	<div class="">
		<p class="text-sm">Notas: {st.notes}</p>
		<p class="text-sm">Fecha de envio: {parseDateToMonthDayYear(st.transaction_date)}</p>
	</div>
</li>
