import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const p = await parent();
	if (p.session) throw redirect(301, '/manager-hub');
	return {};
};
