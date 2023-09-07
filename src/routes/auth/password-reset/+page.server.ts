import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	// user.set(_sess.data.session?.user ?? null);

	if (!session) {
		throw redirect(300, '/auth/login');
	}
	return { user: session.user };
};
