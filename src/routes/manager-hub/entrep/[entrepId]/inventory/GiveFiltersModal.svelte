<script lang="ts">
	import QuantityButtons from '$lib/components/Buttons/QuantityButtons.svelte';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { t } from '$lib/translations';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { SupplyTransaction } from '$lib/types/sbTypes';
	import { POSSIBLE_QTY } from '$lib/utils/constants';
	import { calculateFutureDate, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';

	export let entrepId: string;
	export let name: string;
	export let initialQ: number | null | undefined = 8;
	export let supabase: SupabaseClient<Database>;
	export let managerId: string;
	const dispatch = createEventDispatcher();
	const scheduleDate = calculateFutureDate().toDate();
	// TODO put defaults here from a central place
	const newTransaction = {
		entrep_id: entrepId,
		id: nanoid(10),
		item: 'FILTER',
		manager_id: managerId,
		quantity: initialQ ?? 8,
		schedule_check_date: scheduleDate.toISOString(),
		notes: ''
	};

	// Get the current date plus n days

	const addSupplyTransaction = async (newTransaction: SupplyTransaction['Insert']) => {
		const { data, error } = await supabase
			.from('supplies_transaction')
			.insert(newTransaction)
			.select();

		if (error) return errorToast(`Error -  ${error.message}`);
		if (data && data.length > 0) {
			return data[0];
		}
	};

	const handleConfirm = async () => {
		if (newTransaction.quantity < 1)
			// @ts-ignore
			return errorToast($t('minDelivery', { minQuantity: POSSIBLE_QTY[0] }));

		try {
			// newCheck.scheduled_date = calculateFutureDate(nDays);
			const data = await addSupplyTransaction(newTransaction);
			// await scheduleCheck(newCheck);
			if (data) {
				// @ts-ignore
				successToast($t('invent.deliverySuccess', { quantity: data.quantity }));
				dispatch('completed', data);
			}
		} catch (error) {
			errorToast($t('unexpectedError'));
		}
	};
</script>

<SlotModalTitle title="Entrega de Filtros a {name}" on:closeModal>
	<div class="space-y-2">
		<h5 class="-mt-4 h5">{$t('invent.howManyFilters')}</h5>
		<QuantityButtons bind:quantity={newTransaction.quantity} />
		<h5 class="h5 py-2">
			{$t('invent.nextInventoryCheck')}:
			<strong>{parseDateToMonthDayYear(scheduleDate)}</strong>
		</h5>

		<TextArea label="Notas" rows={1} bind:value={newTransaction.notes} />
	</div>

	<div slot="footer" class="flex justify-between">
		<button class="btn capitalize variant-ringed" on:click={() => dispatch('closeModal')}
			>{$t('common.cancel')}</button
		>
		<button class="btn capitalize variant-ghost-primary" on:click={handleConfirm}
			>{$t('common.confirm')}</button
		>
	</div>
</SlotModalTitle>
