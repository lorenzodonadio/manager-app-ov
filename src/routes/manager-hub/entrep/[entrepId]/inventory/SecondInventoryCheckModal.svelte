<script lang="ts">
	import { calculateFutureDate, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { warnToast } from '$lib/utils/toasts';
	import type { InventoryCheck, ManagerSupplies } from '$lib/types/sbTypes';
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';

	import { t } from '$lib/translations';
	import { createEventDispatcher } from 'svelte';
	import StartsInput from '$lib/components/StartsInput.svelte';
	const dispatch = createEventDispatcher();
	export let inventCheck: InventoryCheck['Insert'];

	let title = '¿Se vendieron todos los filtros restantes?';
	let step: 'initial' | 'success' = 'initial';
	let rating = 1;
	const handleYes = () => {
		inventCheck.is_completed = true;
		title = 'Chequeo exitoso';
		step = 'success';
	};
	const handleFinishYes = () => {
		inventCheck.actual_check_date = new Date().toISOString();
		inventCheck.rating = rating;
		dispatch('success', inventCheck);
	};
	const handleNo = () => {
		warnToast(
			'Por favor contactar al equipo de Openversum, para realizar la devolucion de inventario'
		);
	};
</script>

<SlotModalTitle on:closeModal {title}>
	<div class="space-y-1 min-w-[400px] max-w-2xl">
		{#if step === 'initial'}
			<h5 class="h5">Segundo chequeo de inventario</h5>
			<p class="p">Agendado para el: {parseDateToMonthDayYear(inventCheck.second_check_date)}</p>
			<p class="p">
				Si no se vendieron todos los filtros restantes se debe hablar con el equipo de Openversum y
				se inicia el proceso de devolucion de inventario
			</p>

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
		{/if}
	</div>
</SlotModalTitle>
