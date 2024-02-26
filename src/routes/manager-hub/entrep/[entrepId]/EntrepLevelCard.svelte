<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { getLevelIcon } from '$lib/assets';
	import LevelIcon from '$lib/components/LevelIcon.svelte';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import SpinnerSvg from '$lib/components/SVG/SpinnerSVG.svelte';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { EntrepLevel, EntrepProfile, SupplyTransaction } from '$lib/types/sbTypes';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	export let entrepProfile: EntrepProfile;
	export let entrepLevel: EntrepLevel['Row'];
	export let possibleLevels: EntrepLevel['Row'][];
	export let firstDelivery: SupplyTransaction['Row'] | undefined;
	export let supabase: SupabaseClient<Database>;

	let loading = false;
	let showChangeLevelModal = false;
	let selectedNextLevel: number = entrepLevel.id;

	const deliveryDate = firstDelivery?.transaction_date
		? dayjs(firstDelivery.transaction_date)
		: null;

	const handleLevelChange = async () => {
		loading = true;

		const { data: _, error } = await supabase
			.from('user_level_map')
			.upsert({ user_id: entrepProfile.id, level_id: selectedNextLevel });
		if (error) {
			errorToast('Error Modificando nivel del emprendedor');
			console.error(error);
		} else {
			await invalidateAll();
			successToast('Nivel Modificado');
		}
		showChangeLevelModal = false;
		loading = false;
	};
</script>

{#if showChangeLevelModal}
	<SlotModalTitle
		on:closeModal={() => (showChangeLevelModal = false)}
		title="Cambiar el Nivel del Emprender"
	>
		{#if loading}
			<div class="w-96 flex justify-center">
				<SpinnerSvg />
			</div>
		{:else}
			<div class="md:min-w-[500px] w-full">
				<h5 class="h5">Selecciona un nivel para los proximos 3 meses del emprendedor</h5>

				<div class="flex justify-center space-x-8 py-2">
					{#each possibleLevels as lvl}
						<div class="flex flex-col items-center">
							<p class="font-semibold text-lg pb-1">{lvl.name}</p>
							<button
								on:click={() => (selectedNextLevel = lvl.id)}
								class:opacity-80={lvl.id === entrepLevel.id}
								class="{selectedNextLevel === lvl.id
									? 'ring-4 ring-primary-500'
									: ''} h-16 w-16 rounded-full overflow-hidden shadow-lg"
							>
								<img
									style="zoom: 125%;"
									class="object-contain"
									alt="entrep icon"
									src={getLevelIcon(lvl.id)}
								/>
							</button>
							<span class="text-sm font-semibold">
								{#if lvl.id === entrepLevel.id}
									Nivel Actual
								{/if}
							</span>
						</div>
					{/each}
				</div>

				<div class="flex justify-between">
					<button class="btn variant-ghost-surface" on:click={() => (showChangeLevelModal = false)}
						>Cancelar</button
					>
					<button on:click={handleLevelChange} class="btn variant-ghost-primary">Confirmar</button>
				</div>
			</div>
		{/if}
	</SlotModalTitle>
{/if}

<div class="card p-1 sm:p-3">
	<div class="flex justify-between">
		<div class="">
			<h4 class="h4 capitalize">
				{entrepProfile.first_name}
				{entrepProfile.last_name}
			</h4>
			<p class="text-lg">Nivel: {entrepLevel.name}</p>
		</div>
		{#key entrepLevel.id}
			<LevelIcon level={entrepLevel.id} size={64} />
		{/key}
	</div>
	<div class="flex justify-between pt-2">
		{#if deliveryDate}
			<p>
				Primer envio de inventario: {parseDateToMonthDayYear(firstDelivery?.transaction_date)}
			</p>
			<p>Dias desde el primer envio de inventario: {dayjs().diff(deliveryDate, 'day')}</p>
		{/if}
		<div class="">
			<button
				on:click={() => (showChangeLevelModal = true)}
				class="btn btn-sm variant-ghost-surface"
			>
				Modificar Nivel del Emprendedor
			</button>
		</div>
	</div>
</div>
