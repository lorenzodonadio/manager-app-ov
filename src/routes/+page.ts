import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const p = await parent();
	if (!p.session) throw redirect(300, '/auth/login');
	throw redirect(301, '/manager-hub');
};
