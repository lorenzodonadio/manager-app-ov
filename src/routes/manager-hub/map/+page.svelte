<script lang="ts">
	import { geoPos } from '$lib/stores/positionStore';
	import { onDestroy } from 'svelte';
	import { onMount } from 'svelte';
	import ArrowLeft from '$lib/components/SVG/ArrowLeft.svelte';
	import LocationModal from './LocationModal.svelte';
	import LL from 'leaflet';
	// import { marker } from 'leaflet';
	// import { locations } from '$lib/stores/locationsStore';
	import { waterDropsIcon } from '$lib/utils/mapIcons';
	import { invalidate } from '$app/navigation';
	import { t } from '$lib/translations';
	export let data;

	const getLocationByCoords = (lat: number, lon: number) => {
		const MAX_DELTA = 0.015;
		for (const loc of data.locations) {
			const latDiff = Math.abs(loc.lat - lat);
			const lonDiff = Math.abs(loc.lon - lon);
			if (latDiff <= MAX_DELTA && lonDiff <= MAX_DELTA) {
				console.log({ latDiff, lonDiff });
				console.log(lat, lon);
				console.log(loc);
				return loc;
			}
		}
		return null;
	};

	let mapElement: HTMLDivElement;
	let map: LL.Map;
	let showLocationModal = false;
	let lat: number, lon: number;

	onMount(async () => {
		if ($geoPos) {
			map = LL.map(mapElement).setView([$geoPos.latitude, $geoPos.longitude], 12);
			LL.marker([$geoPos.latitude, $geoPos.longitude]).addTo(map);
		} else {
			map = LL.map(mapElement).setView([10, -75], 5);
		}

		LL.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		//Add markers for existing locations
		for (const loc of data.locations) {
			addMarker(loc.lat, loc.lon);
		}

		map.on('click', async (e) => {
			let latlng = map.mouseEventToLatLng(e.originalEvent);
			lat = latlng.lat;
			lon = latlng.lng;
			showLocationModal = true;
		});
	});

	onDestroy(async () => {
		if (map) map.remove();
	});

	const addMarker = (newLat: number, newLon: number) => {
		const marker = LL.marker([newLat, newLon], { icon: waterDropsIcon }).addTo(map);
		marker.on('click', () => {
			lat = newLat;
			lon = newLon;
			showLocationModal = true;
		});
	};
</script>

{#if showLocationModal}
	<LocationModal
		on:updatedLocation={(e) => {
			// Only add markers for new locations => Not existent ones
			if (!e.detail.isExisting) {
				const newLoc = e.detail.selectedLocation;
				addMarker(newLoc.lat, newLoc.lon);
			}
			showLocationModal = false;
			invalidate('managerhub:root');
		}}
		on:invited={(e) => {
			data.futureEntrep = [e.detail, ...data.futureEntrep];
			invalidate('managerhub:root');
		}}
		on:closeModal={() => (showLocationModal = false)}
		{lat}
		{lon}
		managerCountryCode={data.manager.country_code}
		{getLocationByCoords}
	/>
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex space-x-4 -mt-2">
	<a class="btn" href="/manager-hub"><ArrowLeft /></a>
	<p class="my-auto truncate">{$t('map.title')}</p>
</div>
<div id="mapEntrepreneurs" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
	#mapEntrepreneurs {
		height: calc(100vh - 94px);
		z-index: 1;
	}
</style>
