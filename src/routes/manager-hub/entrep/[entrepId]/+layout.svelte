<script lang="ts">
	import { page } from '$app/stores';
	import ArrowLeft from '$lib/components/SVG/ArrowLeft.svelte';
	import { t } from '$lib/translations/index.js';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { getContext, onDestroy, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let data;
	const pageTitle: Writable<string> = getContext('pageTitle');

	setContext(
		'currentSales',
		data.currentSales.reduce((p, c) => c.number_sold + p, 0)
	);

	$pageTitle = `Emprendedor: ${data.entrepProfile.first_name} ${data.entrepProfile.last_name} - Nivel: ${data.entrepLevel.name}`;
	const baseUrl = `/manager-hub/entrep/${$page.params.entrepId}`;
	const salesUrl = baseUrl + '/sales';
	const inventUrl = baseUrl + '/inventory';
	onDestroy(() => {
		// Reset default
		$pageTitle = $t('common.managerHub');
	});
</script>

<div class="flex justify-center">
	<div class="relative max-w-5xl w-full flex justify-center">
		<a class="btn absolute left-0" href="/manager-hub">
			<ArrowLeft />
		</a>

		<!-- <h4 class="h4 mt-1">{data.entrepProfile.first_name} {data.entrepProfile.last_name}</h4> -->
		<TabGroup>
			<TabAnchor selected={$page.url.pathname === baseUrl} href={baseUrl}>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<span class="text-lg"> General </span>
			</TabAnchor>
			<TabAnchor selected={$page.url.pathname === salesUrl} href={salesUrl}>
				<span class="text-lg"> Ventas </span>
			</TabAnchor>
			<TabAnchor selected={$page.url.pathname === inventUrl} href={inventUrl}>
				<span class="text-lg"> Inventario </span>
			</TabAnchor>
			<!-- ... -->
		</TabGroup>
	</div>
</div>
<div class="flex justify-center">
	<div class="max-w-5xl w-full">
		<slot />
	</div>
</div>
