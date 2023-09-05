import { dev } from '$app/environment';
import { discordAuth } from '$lib/server/lucia.js';

export async function GET({ locals, cookies }) {
	const [url, state] = await discordAuth.getAuthorizationUrl();

	if (!locals.session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/api/auth/login/osu'
			}
		});
	}

	cookies.set('discord_oauth_state', state, {
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
