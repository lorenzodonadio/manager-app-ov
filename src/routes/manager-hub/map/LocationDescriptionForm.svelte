<script lang="ts">
	import InputFieldNumber from '$lib/components/Inputs/InputFieldNumber.svelte';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';
	import type { Locations } from '$lib/types/sbTypes';

	export let selectedLocation: Locations['Row'] | Locations['Insert'];
</script>

<div class="grid grid-cols-6 gap-4">
	<InputFieldNumber label="Poblacion (1000 habitantes)" bind:value={selectedLocation.population} />

	<InputFieldNumber
		label="Distancia al proveedor (Km)"
		bind:value={selectedLocation.distance_ov_km}
	/>

	<TextArea
		rows={2}
		label="Actividad Principal"
		placeholder="Actividades economicas, es importante mencionar si hay mineria"
		bind:value={selectedLocation.main_activity}
	/>
	<TextArea
		rows={2}
		label="Medios de Pago"
		placeholder="Que medios de pago hay disponible en la zona, y que bancos operan"
		bind:value={selectedLocation.payment_options}
	/>
	<TextArea
		rows={2}
		label="Vias de Acceso"
		placeholder="Describa las principales vias de acceso y su estado"
		bind:value={selectedLocation.access_means}
	/>
	<TextArea
		rows={2}
		label="Comunicaciones"
		placeholder="Lineas de telefono, cobertura mobil y acceso a Internet"
		bind:value={selectedLocation.communications}
	/>
	<TextArea
		rows={2}
		label="Fuentes de agua"
		placeholder="Describa las principales fuentes de agua: aqueducto, rios, lagos"
		bind:value={selectedLocation.water_source}
	/>
	<TextArea
		rows={2}
		label="Problemas de agua"
		placeholder="Describa los problemas generales del agua de esta zona"
		bind:value={selectedLocation.water_problems}
	/>
</div>
