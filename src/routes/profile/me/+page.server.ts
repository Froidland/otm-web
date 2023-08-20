import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(302, '/api/auth/login/osu');
	}

	const profile = await db.user.findFirst({
		where: {
			sessions: {
				some: {
					id: locals.session.sessionId
				}
			}
		}
	});

	if (!profile) {
		throw redirect(302, '/api/auth/login/osu');
	}

	return {
		profile
	};
};
