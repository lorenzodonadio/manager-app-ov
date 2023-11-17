<script lang="ts">
	import { daysUntil, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { InventoryCheck, ManagerSupplies } from '$lib/types/sbTypes';
	import { invalidateAll } from '$app/navigation';
	// import SolidCheckSvg from '$lib/components/SVG/SolidCheckSVG.svelte';
	import SecondInventoryCheckModal from './SecondInventoryCheckModal.svelte';
	import { t } from '$lib/translations';
	import { page } from '$app/stores';
	import { sendFailedSecondCheckEmail } from '$lib/utils/emails';

	export let inventCheck: InventoryCheck['Row'];
	export let areSalesComplete: boolean;
	export let st: ManagerSupplies;
	const supabase = $page.data.supabase;
	const isSecondDateReady = (daysUntil(inventCheck.second_check_date) ?? 0) <= 30;

	let showSecondCheckModal = false;

	const upsertInventoryCheck = async (newInvent: InventoryCheck['Insert']) => {
		const { data, error } = await supabase.from('inventory_checks').upsert(newInvent);

		if (error) return errorToast(error.message);
		successToast($t('common.success'));
		invalidateAll();
	};

	const handleFailedSecondCheck = async () => {
		const entrepName = `${$page.data.entrepProfile.first_name} ${$page.data.entrepProfile.last_name}`;
		const payload = {
			entrepName,
			entrepEmail: $page.data.entrepProfile.email ?? '',
			entrepPhone: $page.data.entrepProfile.phone ?? '',
			managerEmail: $page.data.manager?.email ?? '',
			checkerName: `${$page.data.profile?.first_name ?? ''} ${$page.data.profile?.last_name ?? ''}`,
			checkerEmail: $page.data.profile?.email ?? '',
			supplyDetails: `${st.quantity} - ${st.item}`,
			supplyNote: st.notes ?? '',
			firstCheckDate: st.schedule_check_date ?? '',
			actualFirstCheckDate: st.inventory_checks?.actual_check_date ?? 'N/A',
			failedSecondCheckDate: st.inventory_checks?.second_check_date ?? 'N/A'
		};

		const res = await sendFailedSecondCheckEmail(payload);
		if (res.ok)
			successToast(
				`Se envio un correo al equipo de Openversum con exito, explicando la situacion del emprendedor ${entrepName}`
			);
	};
</script>

{#if showSecondCheckModal && inventCheck}
	<SecondInventoryCheckModal
		{inventCheck}
		on:success={(e) => {
			upsertInventoryCheck(e.detail);
			showSecondCheckModal = false;
		}}
		on:failedCheck={() => {
			handleFailedSecondCheck();
			showSecondCheckModal = false;
		}}
		on:closeModal={() => (showSecondCheckModal = false)}
	/>
{/if}

<p class="flex">Chequeo de inventario Extendido</p>
<p>{parseDateToMonthDayYear(inventCheck.second_check_date)}</p>

<div class="flex justify-center">
	<button
		disabled={!isSecondDateReady && !areSalesComplete}
		on:click={() => (showSecondCheckModal = true)}
		class="btn btn-sm variant-ghost-primary">Realizar Segundo Chequeo</button
	>
</div>
