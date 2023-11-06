export const ZILOG_LOC: [number, number] = [10.947877693629495, -74.9123763469134];

export const haversineDist = ([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]) => {
	const toRadian = (angle: number) => (Math.PI / 180) * angle;
	const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
	const RADIUS_OF_EARTH_IN_KM = 6378.14;

	const dLat = distance(lat2, lat1);
	const dLon = distance(lon2, lon1);

	lat1 = toRadian(lat1);
	lat2 = toRadian(lat2);

	// Haversine Formula
	const a =
		Math.pow(Math.sin(dLat / 2), 2) +
		Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

	return 2 * RADIUS_OF_EARTH_IN_KM * Math.asin(Math.sqrt(a));
};

export const aproxZilogDist = (location: [number, number]) => {
	try {
		// 1.33 is usually a good factor to compensate crow fly vs road distance
		return 1.33 * haversineDist(ZILOG_LOC, location);
	} catch (err) {
		return null;
	}
};
