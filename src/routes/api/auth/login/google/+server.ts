import { dev } from '$app/environment';
import { googleAuth } from '$lib/server/lucia.js';

export async function GET({ locals, cookies }) {
	const [url, state] = await googleAuth.getAuthorizationUrl();

	if (!locals.session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/api/auth/login/osu'
			}
		});
	}

	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}
