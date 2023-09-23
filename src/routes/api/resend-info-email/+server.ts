import { PRIVATE_RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

export const POST = async ({ request }) => {
	if (request.headers.get('Sec-Fetch-Mode') !== 'same-origin') {
		return new Response('Forbidden', { status: 403 });
	}
	const { emailTo, subject, html, fromName } = await request.json();
	// sendEmail(name, email, organization, country, message, type);
	const resend = new Resend(PRIVATE_RESEND_API_KEY);
	// return new Response(`Error sending email`, { status: 500 });

	try {
		const data = await resend.emails.send({
			from: `${fromName ?? 'Manager App Openversum'} <info@openversum.com>`,
			to: emailTo,
			subject,
			html
		});
		return new Response(null, { status: 200 });
	} catch (error) {
		return new Response(`Error sending email`, { status: 500 });
	}
};
