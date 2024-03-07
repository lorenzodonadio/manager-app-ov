export const load = async ({ depends, params, parent, locals }) => {
	// params.entrepId;

	const { data, error } = await locals.supabase
		.from('entrep_level_change_history')
		.select()
		.eq('entrep_id', params.entrepId)
		.order('created_at', { ascending: false });
	return { levelHistory: data ?? [] };
};
