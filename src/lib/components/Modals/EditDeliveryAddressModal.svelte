<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import { DEPARTAMENTO_MUNICIPIO_COL } from '$lib/utils/departamentosColombia';
	import { errorToast } from '$lib/utils/toasts';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';
	import SpinnerSvg from '../SVG/SpinnerSVG.svelte';
	export let supabase: SupabaseClient<Database>;
	export let deliveryAddress: Database['public']['Tables']['entrep_delivery_address']['Row'];
	const dispatch = createEventDispatcher();

	let loading = false;

	//@ts-ignore
	$: possibleMunicipios = DEPARTAMENTO_MUNICIPIO_COL[deliveryAddress.departamento];

	const upsertAddress = async () => {
		loading = true;
		const { data, error } = await supabase.from('entrep_delivery_address').upsert(deliveryAddress);

		if (error) {
			loading = false;
			return errorToast(`Error inesperado: ${error.message}`);
		}
		loading = false;
		dispatch('changedAddress', deliveryAddress);
	};
</script>

<SlotModalTitle on:closeModal title="Modificar Dirección de Envio de Inventario">
	<div class="">
		{#if loading}
			<div class="flex justify-center items-center h-20 min-w-[350px]">
				<SpinnerSvg />
			</div>
		{:else}
			<form on:submit={upsertAddress} class="space-y-2">
				<div class="grid grid-cols-2 gap-4">
					<label class="label">
						<span>Departamento</span>
						<select required bind:value={deliveryAddress.departamento} class="select">
							{#each Object.keys(DEPARTAMENTO_MUNICIPIO_COL) as dept}
								<option value={dept}>{dept}</option>
							{/each}
						</select>
					</label>

					<label class="label">
						<span>Municipio</span>
						<select
							required
							disabled={!deliveryAddress.departamento}
							bind:value={deliveryAddress.municipio}
							class="select"
						>
							{#if deliveryAddress.departamento}
								{#each possibleMunicipios as municipio}
									<option value={municipio}>{municipio}</option>
								{/each}
							{/if}
						</select>
					</label>
				</div>

				<label>
					<span>Dirección</span>
					<input required class="input" type="text" bind:value={deliveryAddress.address} />
				</label>
				<label>
					<span>Dirección (2 linea)</span>
					<input
						class="input"
						type="text"
						placeholder="opcional"
						bind:value={deliveryAddress.address_second_line}
					/>
				</label>
				<label>
					<span>Codigo Postal</span>
					<input
						class="input"
						type="number"
						step="1"
						placeholder="opcional"
						bind:value={deliveryAddress.post_code}
					/>
				</label>
				<div class="flex justify-end">
					<button type="submit" class="btn variant-ghost-primary">Guardar Dirección</button>
				</div>
			</form>
		{/if}
	</div>
</SlotModalTitle>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
