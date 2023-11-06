<script lang="ts">
	import ActiveEntrepLi from './ActiveEntrepLi.svelte';
	import InvitedEntrepLi from './InvitedEntrepLi.svelte';
	import LocationDescriptionForm from './LocationDescriptionForm.svelte';
	import SlotModal from '$lib/components/Modals/SlotModal.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fetchReverseGeolocation } from '$lib/stores/locationsStore';
	import { nanoid } from 'nanoid';
	import SpinnerSvg from '$lib/components/SVG/SpinnerSVG.svelte';
	import InviteNewEntrepreneur from '../InviteNewEntrepreneur.svelte';
	import { strToFloatPrecision } from '$lib/utils/general';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import CloseButton from '$lib/components/Buttons/CloseButton.svelte';
	import type { EntrepProfile, FutureEntrep, Locations } from '$lib/types/sbTypes';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import { aproxZilogDist } from '$lib/utils/distances';

	export let lat: number, lon: number;
	export let managerCountryCode: string | null | undefined;
	export let getLocationByCoords: Function;
	// This component displays a modal with information about a selected location,
	// and allows the user to add or edit location details, as well as invite new entrepreneurs to the location.
	// OFFSET is used to adjust latitude and longitude values when necessary
	const OFFSET = 0.001;

	// createEventDispatcher allows this component to dispatch custom events to its parent
	const dispatch = createEventDispatcher<{
		closeModal: null;
		invited: FutureEntrep['Row'];
		updatedLocation: {
			selectedLocation: Locations['Row'] | Locations['Insert'];
			isExisting: boolean;
		};
	}>();

	// Component state variables
	let selectedLocation: Locations['Row'] | Locations['Insert'] | null = null;
	let isExisting = false; // If the user clicks on an existing location
	let disabled = false;
	let showInvite = false;
	let tabSet = 0;

	// This function is run when the component is first created
	onMount(async () => {
		// Get the location based on provided coordinates
		selectedLocation = getLocationByCoords(lat, lon);

		// If a location is found, it is an existing location
		if (selectedLocation) {
			isExisting = true;
			tabSet = 1;
			return;
		}

		try {
			// Fetch detailed information about the location based on coordinates
			const { country, countryCode, state, city, town, displayName, boundingbox } =
				await fetchReverseGeolocation(lat, lon);

			// Check if a location with the same display name but different coordinates exists
			const existingByName = $page.data.locations.find((x) => x.display_name === displayName);

			// If a location with the same name exists, it is considered as an existing location
			isExisting = !!existingByName;
			if (isExisting) tabSet = 1;

			// Parse the bounding box values to fixed decimals, or set default values based on OFFSET
			const lat1 = strToFloatPrecision(boundingbox[0], 4) ?? +(lat - OFFSET).toFixed(4);
			const lat2 = strToFloatPrecision(boundingbox[1], 4) ?? +(lat + OFFSET).toFixed(4);
			const lon1 = strToFloatPrecision(boundingbox[2], 4) ?? +(lon - OFFSET).toFixed(4);
			const lon2 = strToFloatPrecision(boundingbox[3], 4) ?? +(lon + OFFSET).toFixed(4);

			const initDistance = aproxZilogDist([(lat1 + lat2) / 2, (lon1 + lon2) / 2]);

			// Set the selected location based on existing location or create a new one
			selectedLocation = existingByName ?? {
				access_means: null,
				city: city,
				communications: null,
				country: country,
				country_code: countryCode,
				created_by: $page.data.session?.user.id,
				display_name: displayName,
				distance_ov_km: initDistance,
				id: nanoid(8),
				lat1,
				lat2,
				lon1,
				lon2,
				main_activity: null,
				payment_options: null,
				state: state,
				town: town,
				water_problems: null,
				water_source: null,
				population: null
			};
		} catch (error) {
			if (error instanceof Error) {
				errorToast(error.message);
			}
		}
	});

	// This function is used to add or update location details in the database
	const handleUpsert = async () => {
		// Disable the buttons to prevent multiple submissions
		disabled = true;

		try {
			// Check if a location is selected
			if (selectedLocation) {
				// Add or update the location in the database
				const { data, error } = await $page.data.supabase
					.from('locations')
					.upsert(selectedLocation);

				if (error) {
					errorToast(`Error Updating Location: ${error.message}`);
				} else {
					dispatch('updatedLocation', { selectedLocation, isExisting });
					successToast($t('common.success'));
				}
			} else {
				errorToast('No Location');
			}
		} catch (error) {
			console.error(error);
		} finally {
			disabled = false;
		}
	};
</script>

<SlotModal fullWidth={true} on:closeModal>
	{#if selectedLocation && $page.data.entrepList}
		<div class="card p-2 sm:p-4 sm:pt-3 w-full space-y-2 min-w-full">
			<div class="flex justify-between">
				<div class="flex space-x-2 pb-2">
					<h4 class="h4">{selectedLocation.display_name}</h4>
					<div class="badge max-h-8 badge-glass variant-ghost-secondary">
						{isExisting ? $t('map.existing') : $t('map.new')}
					</div>
				</div>
				<div class="max-h-10">
					<CloseButton size={6} on:click={() => dispatch('closeModal')} />
				</div>
			</div>
			{#if isExisting}
				<TabGroup justify="justify-around">
					<Tab bind:group={tabSet} name="EntrepreneurTab" value={1}>{$t('map.entrepreneurs')}</Tab>
					<Tab bind:group={tabSet} name="DescriptionTab" value={0}
						>{$t('map.locationDescription')}</Tab
					>
				</TabGroup>
				{#if tabSet === 1}
					{#if showInvite}
						<InviteNewEntrepreneur
							on:invite={(e) => {
								showInvite = false;
								dispatch('invited', e.detail);
							}}
							on:cancel={() => (showInvite = false)}
							locationId={selectedLocation.id}
							{managerCountryCode}
						/>
					{:else}
						<div class="space-y-4">
							<div class="flex justify-between">
								<h5 class="h5">{$t('map.entrepreneursInTheArea')}</h5>
								<button
									on:click={() => (showInvite = true)}
									class="btn btn-sm variant-ghost-primary">{$t('map.inviteEntrepreneur')}</button
								>
							</div>
							<ul class="max-h-96 overflow-y-auto space-y-1">
								<li><h6>{$t('map.invited')}</h6></li>
								{#each $page.data.futureEntrep.filter((x) => x.location_id === selectedLocation?.id) as entrep}
									<InvitedEntrepLi {entrep} />
								{/each}
								<li><h6>{$t('map.active')}</h6></li>
								{#each $page.data.entrepList.filter((x) => x.location_id === selectedLocation?.id) as entrep}
									<ActiveEntrepLi {entrep} />
								{/each}
							</ul>
						</div>
					{/if}
				{/if}
			{/if}
			{#if tabSet === 0}
				<h5 class="h5">{$t('map.locationDescription')}</h5>
				<LocationDescriptionForm bind:selectedLocation />

				<div class="pt-2 flex justify-between">
					<button
						{disabled}
						class="btn btn-sm variant-filled-surface capitalize"
						on:click={() => dispatch('closeModal')}>{$t('common.cancel')}</button
					>
					<button {disabled} class="btn btn-sm variant-filled-primary" on:click={handleUpsert}
						>{isExisting ? $t('map.saveChanges') : $t('map.addLocation')}</button
					>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex justify-center">
			<SpinnerSvg />
		</div>
	{/if}
</SlotModal>
