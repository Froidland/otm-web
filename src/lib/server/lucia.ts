import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';

import { osu } from '@lucia-auth/oauth/providers';
import { db } from './db';

export const auth = lucia({
	env: 'DEV',
	middleware: sveltekit(),
	adapter: prisma(db),

	getUserAttributes: (data) => {
		return {
			osuUsername: data.osu_username
		};
	}
});

export const osuAuth = osu(auth, {
	clientId: import.meta.env.VITE_OSU_CLIENT_ID,
	clientSecret: import.meta.env.VITE_OSU_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_OSU_REDIRECT_URI
});

export type Auth = typeof auth;
