<script lang="ts">
	import EditDeliveryAddressModal from '$lib/components/Modals/EditDeliveryAddressModal.svelte';
	import { parseDateToMonthDayYear } from '$lib/utils/dateHelpers';
	import type { Locations, Profiles } from '$lib/types/sbTypes';
	import EditSvg from '$lib/components/SVG/EditSVG.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import { DEPARTAMENTO_MUNICIPIO_COL } from '$lib/utils/departamentosColombia';
	export let location: Locations['Row'] | undefined;
	export let entrepProfile: Profiles['Row'];
	export let supabase: SupabaseClient<Database>;
	export let deliveryAddress: Database['public']['Tables']['entrep_delivery_address']['Row'] | null;
	let showAddressModal = false;

	const getEmptyDeliveryAddress = () => {
		const EMPTY_DELIVERY_ADDRESS = {
			user_id: entrepProfile.id,
			address: '',
			address_second_line: null,
			departamento: '',
			municipio: '',
			post_code: null
		};

		if (!location) return EMPTY_DELIVERY_ADDRESS;
		const locName = location.display_name.toLowerCase();

		for (const [dept, municipios] of Object.entries(DEPARTAMENTO_MUNICIPIO_COL)) {
			if (locName.includes(dept.toLowerCase())) {
				EMPTY_DELIVERY_ADDRESS.departamento = dept;
				for (const m of municipios) {
					if (locName.includes(m.toLowerCase())) {
						EMPTY_DELIVERY_ADDRESS.municipio = m;
						break;
					}
				}
				break;
			}
		}
		return EMPTY_DELIVERY_ADDRESS;
	};
</script>

{#if showAddressModal}
	{@const address = deliveryAddress ?? getEmptyDeliveryAddress()}
	<EditDeliveryAddressModal
		deliveryAddress={address}
		{supabase}
		on:closeModal={() => (showAddressModal = false)}
		on:changedAddress={(e) => {
			showAddressModal = false;
			deliveryAddress = e.detail;
		}}
	/>
{/if}

<h4 class="h4 pb-1">Datos del emprendedor</h4>
<div class="grid grid-cols-2 md:grid-cols-4 gap-1">
	{#if location}
		<p class="font-semibold">Zona de Ventas:</p>
		<p class="md:col-span-3">{location.display_name}</p>
	{/if}

	<p class="font-semibold">Dirección de envio de inventario:</p>
	<div class="md:col-span-3 flex justify-between">
		{#if deliveryAddress}
			<p>
				{deliveryAddress.address}
				{deliveryAddress.address_second_line ?? ''}
				{deliveryAddress.post_code ?? ''} ,
				{deliveryAddress.municipio} ,
				{deliveryAddress.departamento}
			</p>
			<button on:click={() => (showAddressModal = true)}> <EditSvg /></button>
		{:else}
			<button class="btn btn-sm variant-ghost-warning" on:click={() => (showAddressModal = true)}>
				Agregar dirección de envio!</button
			>
		{/if}
	</div>
	<p class="font-semibold">Telefono:</p>
	<p class="md:col-span-3">
		<a class="anchor" href="tel://{entrepProfile.phone}">{entrepProfile.phone}</a>
	</p>
	<p class="font-semibold">Email:</p>
	<p class="md:col-span-3">
		<a class="anchor" href="mailto://{entrepProfile.email}">{entrepProfile.email} </a>
	</p>
	<!-- <p >Edad: {entrepProfile.age_year ?? '-'}</p> -->
	{#if entrepProfile.created_at}
		<p class="font-semibold">Emprendedor Desde:</p>
		<p class="md:col-span-3">{parseDateToMonthDayYear(entrepProfile.created_at)}</p>
	{/if}
</div>
