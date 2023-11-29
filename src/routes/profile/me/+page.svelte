<script lang="ts">
	import DiscordIcon from '$lib/components/icons/DiscordIcon.svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.profile.osu_username}'s Profile</title>
</svelte:head>

<div class="bg-osu flex flex-col justify-center w-[400px] h-[250px] rounded-xl p-3 gap-3">
	<div class="flex flex-col gap-2">
		<div>
			<h2 class="font-medium text-center">osu!</h2>
			<p class="text-center">
				<a
					class="text-pink-400 hover:underline"
					href="https://osu.ppy.sh/users/{data.profile.osu_id}">{data.profile.osu_username}</a
				>
				| ID: <span class="text-pink-400">{data.profile.osu_id}</span>
			</p>
		</div>
		<div>
			<h2 class="font-medium text-center">Discord</h2>
			{#if data.profile.discord_id}
				<p class="text-center">
					<span class="text-blue-500">{data.profile.discord_username}</span> | ID:
					<span class="text-blue-500">{data.profile.discord_id}</span>
				</p>
			{:else}
				<div class="flex justify-center">
					<Button
						class="bg-blue-600 flex gap-2 text-white rounded hover:bg-blue-700"
						href="/api/auth/login/discord"><DiscordIcon size="18" /> Sign in with Discord</Button
					>
				</div>
			{/if}
		</div>
		<div>
			<h2 class="font-medium text-center">Google</h2>
			{#if data.profile.google_email}
				<p class="text-center">
					{data.profile.google_email} | ID: {data.profile.google_id}
				</p>
			{:else}
				<div class="flex justify-center">
					<Button class="flex gap-2 text-black rounded" href="/api/auth/login/google"
						><GoogleIcon size="18" /> Sign in with Google</Button
					>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex justify-center">
		<Button variant="destructive" class="rounded" href="/api/auth/logout">Log out</Button>
	</div>
</div>
