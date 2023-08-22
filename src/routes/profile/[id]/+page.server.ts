import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const profile = await db.user.findFirst({
		where: {
			osu_id: params.id
		}
	});

	if (!profile) {
		throw error(404, {
			message: `Profile with user id ${params.id} not found.`
		});
	}

	return {
		profile
	};
};
