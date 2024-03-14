<script lang="ts">
	import EntrepInfoCard from './EntrepInfoCard.svelte';
	import SalesPeriodInfoCard from './SalesPeriodInfoCard.svelte';
	import EntrepLevelCard from './EntrepLevelCard.svelte';
	export let data;

	$: filtersSold = data.currentSales.reduce((p, c) => c.number_sold + p, 0);
</script>

<div class="space-y-2 sm:space-y-4">
	<EntrepLevelCard
		firstDelivery={data.supplyTransactions.at(0)}
		entrepLevel={data.entrepLevel}
		possibleLevels={data.entrepreneurLevels}
		entrepProfile={data.entrepProfile}
		supabase={data.supabase}
		levelHistory={data.levelHistory}
		managerId={data.profile?.id}
	/>

	<div class="card p-1 sm:p-3">
		<EntrepInfoCard
			supabase={data.supabase}
			location={data.location}
			entrepProfile={data.entrepProfile}
			deliveryAddress={data.deliveryAddress}
		/>
	</div>

	{#if data.entrepProfile.latestTransaction && !data.entrepProfile.isTransactionComplete}
		<SalesPeriodInfoCard
			latestTransaction={data.entrepProfile.latestTransaction}
			availableFilters={data.availableFilters}
			{filtersSold}
		/>
	{/if}
</div>
