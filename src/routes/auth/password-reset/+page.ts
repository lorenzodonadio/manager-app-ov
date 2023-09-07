// import { redirect } from '@sveltejs/kit';

// export const load = async ({ data }) => {
// 	const session = await data.getSession();
// 	let success = true
// 	let message = ''
// 	const user = session?.user;
// 	if (user?.recovery_sent_at) {
// 		const recoverySent = new Date(user?.recovery_sent_at);
// 		const enalapsed = (Date.now() - recoverySent.getTime()) / 1000;
// 		// console.log(enalapsed);
// 		// console.log(recoverySent);
// 		if (enalapsed > 30 * 60) {
// 			success = false
// 			message = 'Expired password reset request - pleaes make a new one';
// 		}
// 	} else {
// 		success = false
// 			message = 'You cant change your password - ask for a recovery link';
// 	}
// 	return {success,message};
// };
