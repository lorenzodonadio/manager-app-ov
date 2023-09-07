import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(300, '/auth/login');
	throw redirect(301, '/manager-hub');
	// return {};
}) satisfies PageServerLoad;
