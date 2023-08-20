import { db } from '$lib/server/db.js';
import { auth, discordAuth } from '$lib/server/lucia.js';

export async function GET({ url, cookies, locals }) {
	const storedState = cookies.get('discord_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}

	if (!locals.session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/auth/login/osu' // TODO: Redirect to error page: Login with osu! first.
			}
		});
	}

	try {
		const { discordUser, discordTokens, createKey } = await discordAuth.validateCallback(code);

		const existingUser = await db.user.findFirst({
			where: {
				discord_id: discordUser.id
			}
		});

		if (existingUser) {
			return new Response(null, {
				status: 400
			});
		}

		const key = await createKey(locals.session.user.userId);

		await db.user.update({
			where: {
				id: locals.session.user.userId
			},
			data: {
				discord_id: discordUser.id,
				discord_username: `${discordUser.username}${
					discordUser.discriminator === '0' ? '' : discordUser.discriminator ?? ''
				}`
			}
		});

		await db.oAuthCredentials.upsert({
			where: {
				key_id: `${key.providerId}:${key.providerUserId}`
			},
			create: {
				key: {
					connect: {
						id: `${key.providerId}:${key.providerUserId}`
					}
				},
				access_token: discordTokens.accessToken,
				refresh_token: discordTokens.refreshToken,
				access_token_expires_in: discordTokens.accessTokenExpiresIn
			},
			update: {
				access_token: discordTokens.accessToken,
				refresh_token: discordTokens.refreshToken,
				access_token_expires_in: discordTokens.accessTokenExpiresIn
			}
		});

		await auth.invalidateAllUserSessions(locals.session.user.userId);

		const session = await auth.createSession({
			userId: locals.session.user.userId,
			attributes: {}
		});

		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/profile/me'
			}
		});
		// eslint-disable-next-line
	} catch (error: any) {
		console.error(error);

		if (error.message === 'OAUTH_REQUEST_FAILED') {
			return new Response(null, {
				status: 400
			});
		}

		return new Response(null, {
			status: 500
		});
	}
}
