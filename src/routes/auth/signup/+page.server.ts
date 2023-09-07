import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (session) throw redirect(300, '/manage-hub');
	return {};
};

export const actions = {
	signup: async ({ request, url, locals: { supabase, getSession } }) => {
		const data = await request.formData();
		const email = String(data.get('email'));
		const password = String(data.get('password'));
		const passwordConfirm = String(data.get('passwordConfirm'));
		const emailRedirectTo = String(data.get('redirectTo'));
		if (password != passwordConfirm) return fail(400, { message: 'Passwords dont Match' });

		const { data: _, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo
			}
		});

		if (error) return fail(error.status ?? 500, { message: 'Error' });

		return { status: 200 };
	}
};
