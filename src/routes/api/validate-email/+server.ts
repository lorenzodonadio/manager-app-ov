export const GET = async ({ url, request, locals: { supabase } }) => {
	if (request.headers.get('Sec-Fetch-Mode') !== 'same-origin') {
		return new Response('Forbidden', { status: 403 });
	}

	const email = url.searchParams.get('email');

	if (!email) {
		return new Response('Email is required', { status: 400 });
	}

	const { data, error } = await supabase.from('future_manager').select('*').match({ email });

	if (error) {
		return new Response(`${error.code} - ${error.message}`, { status: 500 });
	}
	// console.log(entrep, man);
	const isEmailManager = data.length > 0;

	return new Response(JSON.stringify({ isEmailManager }), {
		headers: { 'content-type': 'application/json' }
	});
};
