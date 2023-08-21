<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.user.osu_username}'s Profile</title>
</svelte:head>

<div class="bg-zinc-800 rounded-xl p-4">
	<p>osu! username: <span class="text-pink-300">{data.user.osu_username}</span></p>
	<p>osu! id: <span class="text-pink-300">{data.user.osu_id}</span></p>
	<p>
		discord tag: <span class={data.user.discord_username ? 'text-blue-500' : 'text-red-500'}
			>{data.user.discord_username}</span
		>
	</p>
	<p>
		discord id: <span class={data.user.discord_id ? 'text-blue-500' : 'text-red-500'}
			>{data.user.discord_id}</span
		>
	</p>
</div>
