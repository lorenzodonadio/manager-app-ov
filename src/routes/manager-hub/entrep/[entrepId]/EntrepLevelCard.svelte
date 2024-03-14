<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
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
	export let levelHistory: Database['public']['Tables']['entrep_level_change_history']['Row'][];
	export let managerId: string | null = null;

	const DAYS_BETWEEN_LEVEL_CHANGES = 30;

	let loading = false;
	let showChangeLevelModal = false;
	let selectedNextLevel: number = entrepLevel.id;
	let levelChangeNotes = '';
	const deliveryDate = firstDelivery?.transaction_date
		? dayjs(firstDelivery.transaction_date)
		: null;

	$: lastLevelChange = levelHistory.at(0);
	$: lastChangeDate = lastLevelChange ? dayjs(lastLevelChange.created_at) : deliveryDate;
	$: levelFromName = possibleLevels.find((x) => x.id === lastLevelChange?.level_from)?.name;
	$: levelToName = possibleLevels.find((x) => x.id === lastLevelChange?.level_to)?.name;
	const handleLevelChange = async () => {
		loading = true;

		const { data: _1, error: err1 } = await supabase
			.from('user_level_map')
			.upsert({ user_id: entrepProfile.id, level_id: selectedNextLevel });
		if (err1) {
			errorToast('Error Modificando nivel del emprendedor');
			return console.error(err1);
		} else {
			successToast('Nivel Modificado');
		}

		const { data: _2, error: err2 } = await supabase.from('entrep_level_change_history').insert({
			entrep_id: entrepProfile.id,
			level_from: entrepLevel.id,
			level_to: selectedNextLevel,
			manager_id: managerId,
			notes: levelChangeNotes
		});

		if (err2) {
			errorToast('Error Modificanto Historial de Niveles');
			return console.error(err2);
		}

		await invalidateAll();
		levelChangeNotes = '';
		showChangeLevelModal = false;
		loading = false;
	};
</script>

{#if showChangeLevelModal}
	<SlotModalTitle
		on:closeModal={() => {
			if (loading) return;
			showChangeLevelModal = false;
			levelChangeNotes = '';
		}}
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
							<!-- class:opacity-80={lvl.id === entrepLevel.id} -->
							<button
								on:click={() => (selectedNextLevel = lvl.id)}
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
							<span class="text-sm font-semibold pt-0.5">
								{#if lvl.id === entrepLevel.id}
									Nivel Actual
								{/if}
							</span>
						</div>
					{/each}
				</div>

				<div class="pb-4">
					<label>
						Notas:
						<textarea class="textarea" bind:value={levelChangeNotes} />
					</label>
					<span class="text-xs pt-1"
						>Explica porque se cambia el nivel del emprendedor o porque se mantiene el actual</span
					>
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
	<div class="flex justify-between pb-2">
		<div class="">
			<h4 class="h4 capitalize pb-1">
				{entrepProfile.first_name}
				{entrepProfile.last_name}
			</h4>
			<p class="text-lg">Nivel: {entrepLevel.name}</p>
			{#if deliveryDate}
				<p>
					Primer envio de inventario: {parseDateToMonthDayYear(firstDelivery?.transaction_date)}
				</p>
			{/if}
		</div>
		{#key entrepLevel.id}
			<LevelIcon level={entrepLevel.id} size={64} />
		{/key}
	</div>
	<div class="flex justify-between pt-2">
		<div class="">
			{#if lastLevelChange}
				<p>Ultimo cambio de nivel del emprendedor:</p>
				<p>
					<span>
						{parseDateToMonthDayYear(lastLevelChange?.created_at)}
					</span>
					<strong
						>{levelFromName ?? '➡️'}
						{#if lastLevelChange.level_from}
							{#if lastLevelChange.level_from > lastLevelChange.level_to}
								↘️
							{:else if lastLevelChange.level_from < lastLevelChange.level_to}
								↗️
							{:else}
								➡️
							{/if}
						{/if}
						{levelToName}</strong
					>
				</p>

				<p>Notas: {lastLevelChange.notes}</p>
			{/if}
		</div>
		<div class="">
			{#if lastChangeDate && dayjs().diff(lastChangeDate, 'day') < DAYS_BETWEEN_LEVEL_CHANGES}
				<p>
					<span>Podras Modificar el nivel del emprendedor en</span>
					<strong> {DAYS_BETWEEN_LEVEL_CHANGES - dayjs().diff(lastChangeDate, 'day')} Dias</strong>
				</p>
			{:else}
				<button
					on:click={() => (showChangeLevelModal = true)}
					class="btn btn-sm variant-ghost-surface"
				>
					Modificar Nivel del Emprendedor
				</button>
			{/if}
		</div>
	</div>
</div>
