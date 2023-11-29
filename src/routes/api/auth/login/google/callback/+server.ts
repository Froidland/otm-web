import { db } from '$lib/server/db.js';
import { auth, googleAuth } from '$lib/server/lucia.js';

export async function GET({ url, cookies, locals }) {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	const scopes = url.searchParams.get('scope');

	if (
		!scopes?.includes('https://www.googleapis.com/auth/spreadsheets') ||
		!scopes.includes('https://www.googleapis.com/auth/userinfo.email')
	) {
		return new Response(null, {
			// TODO: Redirect to error page: You must grant access to spreadsheets and email.
			status: 400
		});
	}

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
		const { googleUser, googleTokens, createKey } = await googleAuth.validateCallback(code);

		if (!googleUser.email) {
			return new Response(null, {
				status: 400
			});
		}

		const existingUser = await db.user.findFirst({
			where: {
				google_email: googleUser.email
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
				google_id: googleUser.sub,
				google_email: googleUser.email,
				keys: {
					update: {
						where: {
							id: `${key.providerId}:${key.providerUserId}`
						},
						data: {
							oauth_credentials: {
								upsert: {
									where: {
										key_id: `${key.providerId}:${key.providerUserId}`
									},
									create: {
										access_token: googleTokens.accessToken,
										refresh_token: googleTokens.refreshToken,
										access_token_expires_in: googleTokens.accessTokenExpiresIn
									},
									update: {
										access_token: googleTokens.accessToken,
										refresh_token: googleTokens.refreshToken,
										access_token_expires_in: googleTokens.accessTokenExpiresIn
									}
								}
							}
						}
					}
				}
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
