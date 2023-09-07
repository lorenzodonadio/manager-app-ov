import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	const user = data.user;
	if (user.recovery_sent_at) {
		const recoverySent = new Date(user?.recovery_sent_at);
		const enalapsed = (Date.now() - recoverySent.getTime()) / 1000;
		// console.log(enalapsed);
		// console.log(recoverySent);
		if (enalapsed > 30 * 60) {
			alert('Expired password reset request - pleaes make a new one');
			throw redirect(300, '/');
		}
	} else {
		alert('You cant change your password - ask for a recovery link');
		throw redirect(300, '/');
	}
	return {};
}) satisfies PageLoad;
