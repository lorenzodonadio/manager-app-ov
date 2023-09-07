import LL from 'leaflet';

export const waterDropsIcon = LL.icon({
	iconUrl: '/assets/waterdrops.png',
	// shadowUrl: 'leaf-shadow.png',

	iconSize: [32, 32], // size of the icon
	// shadowSize: [50, 64], // size of the shadow
	iconAnchor: [16, 16] // point of the icon which will correspond to marker's location
	// shadowAnchor: [4, 62], // the same for the shadow
	// popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
