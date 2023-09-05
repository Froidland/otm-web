import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';

import { discord, osu } from '@lucia-auth/oauth/providers';
import { db } from './db';

export const auth = lucia({
	env: import.meta.env.DEV ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(db),

	getUserAttributes: (data) => {
		return {
			osu_username: data.osu_username,
			osu_id: data.osu_id,
			discord_username: data.discord_username,
			discord_id: data.discord_id
		};
	}
});

export const osuAuth = osu(auth, {
	clientId: import.meta.env.VITE_OSU_CLIENT_ID,
	clientSecret: import.meta.env.VITE_OSU_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_OSU_REDIRECT_URI
});

export const discordAuth = discord(auth, {
	clientId: import.meta.env.VITE_DISCORD_CLIENT_ID,
	clientSecret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_DISCORD_REDIRECT_URI,
	scope: ['guilds.join']
});

export type Auth = typeof auth;
