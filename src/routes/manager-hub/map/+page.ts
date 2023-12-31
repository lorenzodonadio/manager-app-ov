import { browser } from '$app/environment';
import { getPosition } from '$lib/stores/positionStore';

export const ssr = false;

export const load = async ({ parent }) => {
	const p = await parent();
	if (browser) getPosition();
	const { data, error } = await p.supabase.from('locations').select();
	p.locations = data ?? [];
	return { ...p };
};
