<script lang="ts">
	import { t } from '$lib/translations';
	import { translateSup } from '$lib/translations/suppliesTranslations';
	import type { EntrepProfile, Profiles, Locations } from '$lib/types/sbTypes';
	import { daysUntil, parseDateToMonthDayYear } from '$lib/utils/dateHelpers';

	export let entrep: EntrepProfile;
	export let manager: Profiles['Row'] | undefined;
	export let location: Locations['Row'] | undefined;
	const name = `${entrep.first_name ?? ''} ${entrep.last_name ?? ''}`;
	// Show button if there is a transaction that is not complete and its the right time
	const daysToDate = daysUntil(entrep?.latestTransaction?.schedule_check_date) ?? 0;
	const showInventCheckButton =
		entrep.latestTransaction && !entrep.isTransactionComplete && daysToDate <= 3;
</script>

<li class="py-1">
	<a class="flex justify-between w-full space-x-2" href="/manager-hub/entrep/{entrep.id}">
		<div class="flex gap-2 flex-wrap justify-between w-2/3">
			<div class="">
				<p>{name}</p>
				<p>{entrep.email}</p>
				{#if showInventCheckButton}
					<a
						class="btn btn-sm variant-ghost-warning mt-2"
						href="/manager-hub/entrep/{entrep.id}/inventory">{$t('home.performInventoryCheck')}</a
					>
				{/if}

				{#if entrep.inventory_request}
					<a
						class="btn btn-sm variant-ghost-warning mt-2"
						href="/manager-hub/entrep/{entrep.id}/inventory"
						>{$t('invent.filterRequest', { quantity: entrep.inventory_request.quantity })}</a
					>
				{/if}
			</div>

			<!-- {#if entrep.inventory_request}
				<div class="my-auto">
					<p class="badge variant-ringed-secondary">
						Pedido de {entrep.inventory_request.quantity}
						{translateSup(entrep.inventory_request.item)}
					</p>
				</div>
			{/if} -->

			{#if entrep.latestTransaction}
				<div class="my-auto space-y-0.5">
					{#if entrep.isTransactionComplete}
						<p class="badge variant-ringed-warning">{$t('home.inactiveEntrepreneur')}</p>
						<p class="text-sm">
							{$t('home.lastOrder')}: {parseDateToMonthDayYear(
								entrep.latestTransaction.transaction_date
							)}
						</p>
					{:else}
						<p class="badge variant-ringed-success">{$t('home.salesPeriodInProgress')}</p>
						<p class="p text-sm">
							{$t('home.fromDate')}: {parseDateToMonthDayYear(
								entrep.latestTransaction.transaction_date
							)}
						</p>
						<p class="p text-sm">
							{$t('home.toDate')}: {parseDateToMonthDayYear(
								entrep.latestTransaction.schedule_check_date
							)}
						</p>
					{/if}
					<p class="p text-sm">
						{translateSup(entrep.latestTransaction.type)}: {entrep.latestTransaction.quantity}
						{translateSup(entrep.latestTransaction.item)}
					</p>
				</div>
			{/if}
		</div>
		<div class="">
			{#if location}
				<p class="text-sm sm:text-base p">{location.display_name}</p>
			{/if}

			{#if manager}
				<p class="text-sm pt-0.5">
					{$t('home.managerLabel')}: {manager.first_name ?? ''}
					{manager.last_name ?? ''}
				</p>
			{/if}
		</div>
	</a>
</li>
