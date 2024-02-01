<script lang="ts">
	import EntrepLi from '$lib/components/EntrepLi.svelte';

	import { t } from '$lib/translations';
	// import { futureEntrep } from '$lib/stores/manager';
	import MapSvg from '$lib/components/SVG/MapSVG.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import InfoCircle from '$lib/components/SVG/InfoCircle.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { EntrepProfile } from '$lib/types/sbTypes';
	export let data;
	let search = '';
	let showAllEntreps = false;

	const myEntreps = data.entrepList.filter((x) => x.is_managed_by_me);
	const getEntreps = (s: string, showAll: boolean) => {
		const entrepsToShow = showAll ? data.entrepList : myEntreps;
		if (search === '') return entrepsToShow;

		return entrepsToShow.filter((x) =>
			`${x.first_name} ${x.last_name} ${x.email}`.toLowerCase().includes(s.toLowerCase())
		);
	};

	$: entrepreneurs = getEntreps(search, showAllEntreps);
</script>

<div class="max-w-5xl mx-auto">
	<div class="flex justify-between pt-1 pb-2">
		<h5 class="h5 flex">
			{$t('manager.youreManager')}
			{$t('common.of')}
			{myEntreps.length ?? 0}
			{$t('manager.entrep')}
			<div class="pt-1.5 pl-1 relative text-sm">
				<Tooltip tooltipMessage={$t('manager.tooltipMessage')}><InfoCircle /></Tooltip>
			</div>
		</h5>
		<div class="flex space-x-1 max-h-8 pl-2">
			{#if data.futureEntrep.length > 0}
				<a
					class="btn btn-sm p-1 sm:p-2 text-sm sm:text-base variant-ghost-secondary"
					href="/manager-hub/invites"
					>{data.futureEntrep.length} {$t('manager.invitations')}
				</a>
			{/if}
			<a
				class="btn btn-sm p-1 sm:p-2 text-sm sm:text-base variant-ghost-primary"
				href="/manager-hub/map"
			>
				<MapSvg size={4} />
				<span class="mb-0.5"> {$t('manager.map')} </span>
			</a>
		</div>
	</div>
	<div class="flex justify-between max-w-xl space-x-4">
		<input
			class="input max-w-xs"
			type="text"
			bind:value={search}
			placeholder={$t('manager.searchEntrep')}
		/>
		<div class="my-auto w-52 flex">
			<SlideToggle size="sm" name="slider-label" bind:checked={showAllEntreps}
				><span class="text-xs whitespace-nowrap"
					>{$t(showAllEntreps ? 'manager.allEntrepreneurs' : 'manager.myEntrepreneurs')}</span
				></SlideToggle
			>
		</div>
	</div>
	{#if entrepreneurs.length > 0}
		<ul class="my-4 divide-y border rounded-md p-2 py-1.5 max-h-[532px] overflow-y-auto">
			{#each entrepreneurs as entrep}
				{@const manager = data.allProfiles.find((x) => x.id === entrep.manager_id)}
				{@const location = data.locations.find((x) => x.id === entrep.location_id)}
				<EntrepLi {entrep} {manager} {location} />
			{/each}
		</ul>
	{:else}
		<p class="text-sm py-2">{$t('manager.noEntrepreneurs')}</p>
	{/if}
</div>
