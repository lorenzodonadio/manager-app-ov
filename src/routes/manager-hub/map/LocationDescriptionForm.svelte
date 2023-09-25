<script lang="ts">
	import InputFieldNumber from '$lib/components/Inputs/InputFieldNumber.svelte';
	import TextArea from '$lib/components/Inputs/TextArea.svelte';
	import { t } from '$lib/translations';
	import type { Locations } from '$lib/types/sbTypes';

	export let selectedLocation: Locations['Row'] | Locations['Insert'];
</script>

<div class="grid grid-cols-6 gap-4">
	<InputFieldNumber label={$t('map.population')} bind:value={selectedLocation.population} />
	<InputFieldNumber
		label={$t('map.distanceToProvider')}
		bind:value={selectedLocation.distance_ov_km}
	/>
	<TextArea
		rows={2}
		label={$t('map.mainActivity')}
		placeholder={$t('map.mainActivityPlaceholder')}
		bind:value={selectedLocation.main_activity}
	/>
	<TextArea
		rows={2}
		label={$t('map.paymentOptions')}
		placeholder={$t('map.paymentOptionsPlaceholder')}
		bind:value={selectedLocation.payment_options}
	/>
	<TextArea
		rows={2}
		label={$t('map.accessMeans')}
		placeholder={$t('map.accessMeansPlaceholder')}
		bind:value={selectedLocation.access_means}
	/>
	<TextArea
		rows={2}
		label={$t('map.communications')}
		placeholder={$t('map.communicationsPlaceholder')}
		bind:value={selectedLocation.communications}
	/>
	<TextArea
		rows={2}
		label={$t('map.waterSource')}
		placeholder={$t('map.waterSourcePlaceholder')}
		bind:value={selectedLocation.water_source}
	/>
	<TextArea
		rows={2}
		label={$t('map.waterProblems')}
		placeholder={$t('map.waterProblemsPlaceholder')}
		bind:value={selectedLocation.water_problems}
	/>
</div>
