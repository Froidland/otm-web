import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/');
	}

	const user = await db.user.findFirst({
		where: {
			sessions: {
				some: {
					id: session.sessionId
				}
			}
		}
	});

	if (!user) {
		throw redirect(302, '/');
	}

	return {
		user
	};
};
