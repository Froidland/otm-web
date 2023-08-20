import { auth } from '$lib/server/lucia';

export async function GET({ locals }) {
	const session = locals.session;

	if (!session) {
		return new Response(null, {
			status: 401,
			headers: {
				Location: '/'
			}
		});
	}

	await auth.invalidateSession(session.sessionId);

	locals.auth.setSession(null);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
