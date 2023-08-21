import { db } from '$lib/server/db.js';
import { auth, osuAuth } from '$lib/server/lucia.js';

export async function GET({ url, cookies, locals }) {
	const storedState = cookies.get('osu_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const { existingUser, osuUser, osuTokens, createUser } = await osuAuth.validateCallback(code);

		const getUser = async () => {
			if (existingUser) return existingUser;

			const user = await createUser({
				attributes: {
					osu_username: osuUser.username,
					osu_id: osuUser.id.toString(),
					discord_username: null,
					discord_id: null
				}
			});

			await db.oAuthCredentials.create({
				data: {
					access_token: osuTokens.accessToken,
					refresh_token: osuTokens.refreshToken,
					access_token_expires_in: osuTokens.accessTokenExpiresIn,
					key: {
						connect: {
							id: `osu:${osuUser.id}`
						}
					}
				}
			});

			return user;
		};

		const user = await getUser();

		const session = await auth.createSession({
			userId: user.userId,
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
		console.log(error);
		//! Apparently there is an error with the OAuthRequestError import from lucia.
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
