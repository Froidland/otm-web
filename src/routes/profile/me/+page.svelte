<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.profile.osu_username}'s Profile</title>
</svelte:head>

<div class="bg-osu rounded-xl p-4">
	<p>osu! username: <span class="text-pink-300">{data.profile.osu_username}</span></p>
	<p>osu! id: <span class="text-pink-300">{data.profile.osu_id}</span></p>
	<p>
		discord tag: <span class={data.profile.discord_username ? 'text-blue-500' : 'text-red-500'}
			>{data.profile.discord_username}</span
		>
		<!-- TODO: Make a warning modal saying that this action will close all sessions in other browsers. -->
		{#if !data.profile.discord_id}
			<a href="/api/auth/login/discord" class="hover:text-blue-500">Link to discord!</a>
		{/if}
	</p>
	<p>
		discord id: <span class={data.profile.discord_id ? 'text-blue-500' : 'text-red-500'}
			>{data.profile.discord_id}</span
		>
	</p>
</div>
