import gota from '$lib/assets/LvlGota.png';
import arroyo from '$lib/assets/LvlArroyo.png';
import rio from '$lib/assets/LvlRio.png';

export const getLevelIcon = (lvl: number) => {
	if (lvl === 2) return arroyo;
	if (lvl === 3) return rio;
	return gota;
};
