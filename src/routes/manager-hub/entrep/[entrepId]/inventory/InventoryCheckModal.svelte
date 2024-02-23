<script lang="ts">
	import { calculateFutureDate, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { warnToast } from '$lib/utils/toasts';
	import type { InventoryCheck, ManagerSupplies } from '$lib/types/sbTypes';
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';
	// @ts-ignore
	import { t } from '$lib/translations';
	import { createEventDispatcher, getContext } from 'svelte';
	import StartsInput from '$lib/components/StartsInput.svelte';
	import { DEFAULT_CURRENCY } from '$lib/utils/constants';
	const dispatch = createEventDispatcher();
	export let st: ManagerSupplies;

	const fitlersSold: number = getContext('currentSales');

	let title = `¿Se vendieron todos los ${st.quantity} ${translateSup(st.item)}?`;
	let step: 'initial' | 'success' | 'extension' = 'initial';
	let rating = 1;

	const inventCheck: InventoryCheck['Insert'] = {
		entrep_id: st.entrep_id,
		extension_granted: null,
		id: st.id,
		is_completed: null,
		manager_id: st.manager_id,
		notes: '',
		second_check_date: null
	};
	const secondScheduleDate = calculateFutureDate().toDate();

	const handleYes = () => {
		inventCheck.is_completed = true;
		title = 'Chequeo exitoso';
		step = 'success';
	};
	const handleFinishYes = () => {
		inventCheck.rating = rating;
		inventCheck.actual_check_date = new Date().toISOString();
		dispatch('success', inventCheck);
	};
	const handleNo = () => {
		warnToast('Es necesario que todos los filtros se hayan vendido');
		title = '¿Otorgar una extension al emprendedor?';
		step = 'extension';
		inventCheck.is_completed = false;
	};

	const handleExtensionYes = () => {
		inventCheck.extension_granted = true;
		inventCheck.second_check_date = secondScheduleDate.toISOString();
		dispatch('extension', inventCheck);
	};

	const handleExtensionNo = () => {
		dispatch('noExtension');
	};
</script>

<SlotModalTitle on:closeModal {title}>
	<div class="space-y-1 min-w-[500px] max-w-2xl">
		{#if step === 'initial'}
			<h5 class="h5">Chequeo de inventario</h5>
			<p>Agendado para el: {parseDateToMonthDayYear(st.schedule_check_date)}</p>
			<!-- <p>
				En el sistema se registran {fitlersSold} filtros vendidos, Se otorga un discount de {discount}
				{DEFAULT_CURRENCY} por las ventas
			</p> -->
			<div class="flex justify-between pt-2">
				<button on:click={handleNo} class="btn variant-ghost-warning">No</button>
				<button on:click={handleYes} class="btn variant-ghost-primary">Yes</button>
			</div>
		{:else if step === 'success'}
			<p class="p mb-1">Evalua el trabajo del emprendedor</p>
			<StartsInput bind:stars={rating} />
			<TextArea rows={2} label={$t('common.notes')} bind:value={inventCheck.notes} />
			<div class="flex justify-end pt-2">
				<button on:click={handleFinishYes} class="btn variant-ghost-primary">Finalizar</button>
			</div>
		{:else if step === 'extension'}
			<p>Fecha del nuevo chequeo: {parseDateToMonthDayYear(secondScheduleDate)}</p>
			<p>
				Si se vendieron parcialmente los filtros se otorgara una extension de 30 dias al emprendedor
				para completar las ventas
			</p>
			<p>
				Si no se vendio ningun filtro se debe hablar con el equipo de Openversum y se inicia el
				proceso de devolucion de inventario
			</p>
			<!-- <p>
				En el sistema se registran {fitlersSold} filtros vendidos, Se otorga un discount de {discount.toString()}
				{DEFAULT_CURRENCY} por las ventas
			</p> -->

			<TextArea rows={2} label={$t('common.notes')} bind:value={inventCheck.notes} />
			<div class="flex justify-between pt-2">
				<button on:click={handleExtensionNo} class="btn variant-ghost-warning">No</button>
				<button on:click={handleExtensionYes} class="btn variant-ghost-primary">Yes</button>
			</div>
		{/if}
	</div>
</SlotModalTitle>
