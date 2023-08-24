import { dev } from '$app/environment';
import { osuAuth } from '$lib/server/lucia.js';

export async function GET({ cookies }) {
	const [url, state] = await osuAuth.getAuthorizationUrl();

	cookies.set('osu_oauth_state', state, {
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
