export const ssr = false;

export const load = async ({ parent }) => {
	const p = await parent();
	const { data, error } = await p.supabase.from('locations').select();
	p.locations = data ?? [];
	return { ...p };
};
