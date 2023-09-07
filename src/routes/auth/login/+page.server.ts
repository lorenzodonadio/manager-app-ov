import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (session) throw redirect(300, '/');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, url, locals: { supabase, getSession } }) => {
		const data = await request.formData();

		const email = String(data.get('email'));
		const password = String(data.get('password'));
		if (!email) return fail(400, { message: 'Email required' });
		if (!password) return fail(400, { message: 'Password required' });
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		const errorAndsignOut = async (message: string, status: number | undefined | null = null) => {
			await supabase.auth.signOut();
			return fail(status ?? 500, { message });
		};

		if (error) return await errorAndsignOut(error.message, error.status);
		// Check if manager record exists!
		const session = await getSession();
		// console.log(session);
		const user = session?.user; //In theory this always exsts because we just logde in
		if (!user) return await errorAndsignOut('Failed to login');

		const { data: mgrId, error: manErr } = await supabase
			.from('manager')
			.select('id')
			.eq('id', user.id);
		// There is no manager -> this is first login probably
		if (!mgrId || mgrId.length < 1) {
			const { data, error } = await supabase
				.from('future_manager')
				.select('*')
				.match({ email: user.email });
			if (error) return await errorAndsignOut('Failed to create Manager record');
			if (data && data.length > 0) {
				// If there is a future manager insert a record in the manager table
				// get the current user, to insert its data

				const { data: _, error } = await supabase
					.from('manager')
					.insert({ id: user.id, email: user.email ?? '', country_code: data[0].country_code });

				if (error) return await errorAndsignOut('Failed to create Manager record');
			}
		}

		// fail(500, { message: "You are not a manager" });
		// if (url.searchParams.has('redirectTo')) {
		// 	throw redirect(303, url.searchParams.get('redirectTo'));
		// }
		throw redirect(300, '/manager-hub');
	}
};
