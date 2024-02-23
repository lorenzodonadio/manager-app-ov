<script lang="ts">
	import QuantityButtons from '$lib/components/Buttons/QuantityButtons.svelte';
	import IndividualCheckBox from '$lib/components/Inputs/IndividualCheckBox.svelte';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import SpinnerSvg from '$lib/components/SVG/SpinnerSVG.svelte';
	import { t } from '$lib/translations';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { SupplyTransaction } from '$lib/types/sbTypes';
	import { POSSIBLE_QTY, SUGGESTED_PRICE } from '$lib/utils/constants';
	import { calculateFutureDate, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';

	export let entrepId: string;
	export let name: string;
	export let initialQ: number | null | undefined = 10;
	export let supabase: SupabaseClient<Database>;
	export let managerId: string;
	export let entrepLevel: Database['public']['Tables']['entrep_level']['Row'];
	const dispatch = createEventDispatcher();
	const scheduleDate = calculateFutureDate().toDate();

	const MIN_AMOUNT_FOR_DISCOUNT = 20;
	let loading = false;
	let includeEarlyPayDiscount = false;
	let includeAmountDiscount = false;

	$: if (newTransaction.quantity < MIN_AMOUNT_FOR_DISCOUNT) includeAmountDiscount = false;

	$: filterMargins = calculateFilterPriceMargins(includeAmountDiscount, includeEarlyPayDiscount);
	// TODO put defaults here from a central place
	const newTransaction = {
		entrep_id: entrepId,
		id: nanoid(10),
		item: 'FILTER',
		manager_id: managerId,
		quantity: initialQ ?? 10,
		schedule_check_date: scheduleDate.toISOString(),
		notes: ''
	};

	const addSupplyPrice = async (supplyId: string) => {
		const payload = {
			currency: 'COP',
			entrep_margin: filterMargins.entrepreneurMargin,
			filter_unit_price: filterMargins.openversumMargin,
			id: supplyId,
			margin_detail: {
				baseMargin: entrepLevel.filter_margin_cop,
				earlyDiscount: includeEarlyPayDiscount ? entrepLevel.early_pay_discount : 0,
				amountDiscount: includeAmountDiscount ? entrepLevel.twenty_or_more_discount_cop : 0
			}
		};
		return supabase.from('supplies_price').insert(payload);
	};

	const handleConfirm = async () => {
		if (newTransaction.quantity < 1)
			// @ts-ignore
			return errorToast($t('minDelivery', { minQuantity: POSSIBLE_QTY[0] }));
		loading = true;
		try {
			// newCheck.scheduled_date = calculateFutureDate(nDays);
			// const data = await addSupplyTransaction(newTransaction);
			const { data, error } = await supabase
				.from('supplies_transaction')
				.insert(newTransaction)
				.select()
				.maybeSingle();
			if (error) return errorToast(`Error -  ${error.message}`);
			// await scheduleCheck(newCheck);
			if (!data) return;

			const { data: _, error: errPrice } = await addSupplyPrice(data.id);
			//TODO , delete the transaction that we just added withouth a price.
			if (errPrice) return errorToast(`Error -  ${errPrice.message}`);

			// @ts-ignore
			successToast($t('invent.deliverySuccess', { quantity: data.quantity }));
			dispatch('completed', data);
		} catch (error) {
			errorToast($t('invent.unexpectedError'));
		} finally {
			loading = false;
		}
	};

	const calculateFilterPriceMargins = (incAmtDis: boolean, incEarlyDis: boolean) => {
		let margin = entrepLevel.filter_margin_cop;
		if (incEarlyDis) {
			margin += entrepLevel.early_pay_discount;
		}
		if (incAmtDis) {
			margin += entrepLevel.twenty_or_more_discount_cop;
		}

		return {
			openversumMargin: SUGGESTED_PRICE.COP - margin,
			entrepreneurMargin: margin
		};
	};
</script>

<SlotModalTitle title="{$t('invent.giveModalTitle')} {name}" on:closeModal>
	<div class="space-y-2 min-w-full md:min-w-[500px]">
		{#if loading}
			<SpinnerSvg />
		{:else}
			<h4 class="-mt-2 h4">{$t('invent.howManyFilters')}</h4>
			<QuantityButtons bind:quantity={newTransaction.quantity} />
			<h5 class="h5 py-2">
				{$t('invent.nextInventoryCheck')}:
				<strong>{parseDateToMonthDayYear(scheduleDate)}</strong>
			</h5>

			<div class="flex justify-between">
				<h4 class="h4 py-2">Descuentos</h4>
				<p class="pt-4 whitespace-nowrap">Nivel <strong>{entrepLevel.name}</strong></p>
			</div>
			<div class="grid grid-cols-2 gap-1 sm:gap-4 border-b">
				<!-- TODO FORMAT THIS NICELY  IN TWO COLUM LAYOUT -->
				<div class="space-y-1">
					<p>Precio De Filtro (x1):</p>
					<p>Margen Emprendedor Fijo:</p>
					<p>Descuento Prontopago:</p>
					{#if newTransaction.quantity >= MIN_AMOUNT_FOR_DISCOUNT}
						<p>Descuento Por Cantidad:</p>
					{/if}
				</div>
				<div class="space-y-1">
					<p class="text-end"><strong>{SUGGESTED_PRICE.COP.toLocaleString()}</strong> COP</p>
					<p class="text-end">
						<strong>{entrepLevel.filter_margin_cop.toLocaleString()}</strong> COP
					</p>
					<p class="flex space-x-2 justify-end text-end my-auto">
						<IndividualCheckBox bind:checked={includeEarlyPayDiscount} />
						<strong>{entrepLevel.early_pay_discount.toLocaleString()}</strong> COP
					</p>
					{#if newTransaction.quantity >= MIN_AMOUNT_FOR_DISCOUNT}
						<p class="flex space-x-2 justify-end text-end my-auto">
							<IndividualCheckBox bind:checked={includeAmountDiscount} />
							<strong>{entrepLevel.twenty_or_more_discount_cop.toLocaleString()}</strong> COP
						</p>
					{/if}
				</div>
			</div>
			<div class="grid grid-cols-3 gap-1">
				<p />
				<strong class="text-end">Openversum</strong>
				<strong class="text-end">Emprendedor</strong>
				<p>Margen (x1):</p>
				<p class="text-end">
					{filterMargins.openversumMargin.toLocaleString()} COP
				</p>
				<p class="text-end">
					{filterMargins.entrepreneurMargin.toLocaleString()} COP
				</p>
				<p>Total:</p>

				<strong class="text-end">
					{(filterMargins.openversumMargin * newTransaction.quantity).toLocaleString()} COP
				</strong>
				<strong class="text-end">
					{(filterMargins.entrepreneurMargin * newTransaction.quantity).toLocaleString()} COP
				</strong>
			</div>
			<!-- <pre>
			{JSON.stringify(entrepLevel, null, 1)}
		</pre> -->
			<TextArea label="Notas" rows={1} bind:value={newTransaction.notes} />
		{/if}
	</div>

	<div slot="footer" class="flex justify-between">
		{#if !loading}
			<button class="btn capitalize variant-ringed" on:click={() => dispatch('closeModal')}
				>{$t('common.cancel')}</button
			>
			<button
				disabled={loading}
				class="btn capitalize variant-ghost-primary"
				on:click={handleConfirm}
			>
				{$t('common.confirm')}
			</button>
		{/if}
	</div>
</SlotModalTitle>
