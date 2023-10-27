<script lang="ts">
	import InventoryCheckModal from './InventoryCheckModal.svelte';
	import { daysUntil, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast, warnToast } from '$lib/utils/toasts';
	import type { InventoryCheck, ManagerSupplies } from '$lib/types/sbTypes';
	import { invalidateAll } from '$app/navigation';
	import { t } from '$lib/translations';
	import { page } from '$app/stores';

	export let st: ManagerSupplies;
	export let areSalesComplete: boolean;
	const supabase = $page.data.supabase;

	const isTimeForCheck = (daysUntil(st.schedule_check_date) ?? 0) <= 3;

	let showCheckModal = false;

	const insertInventoryCheck = async (newInvent: InventoryCheck['Insert']) => {
		const { data, error } = await supabase.from('inventory_checks').insert(newInvent);

		if (error) return errorToast(error.message);
		successToast($t('common.success'));
		invalidateAll();
	};
</script>

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

<p class="">Chequeo de inventario agendado</p>
<p>{parseDateToMonthDayYear(st.schedule_check_date)}</p>
<div class="flex justify-center">
	<button
		disabled={!isTimeForCheck && !areSalesComplete}
		on:click={() => (showCheckModal = true)}
		class="btn btn-sm variant-ghost-primary">Realizar Chequeo</button
	>
</div>
