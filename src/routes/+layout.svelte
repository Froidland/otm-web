<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	import { enhance } from '$app/forms';
	import type { EventHandler } from 'svelte/elements';
	import { invalidateAll } from '$app/navigation';

	async function handleLogout() {
		await fetch('/api/logout', {
			method: 'POST'
		});

		await invalidateAll();
	}

	export let data: LayoutServerData;
</script>

<div class="mx-64">
	<div class="flex items-center justify-between px-4 py-4 bg-zinc-800 rounded-xl my-4">
		<nav class="flex gap-4">
			<Button class="rounded" href="/">Home</Button>
			<Button class="rounded" href="/tournaments">Tournaments</Button>
			<Button class="rounded" href="/tryouts">Tryouts</Button>
		</nav>
		<div class="flex gap-4">
			{#if data.isLoggedIn}
				<Button class="rounded" href="/profile/me">Profile</Button>
				<form on:submit|preventDefault={handleLogout}>
					<Button class="rounded" type="submit">Logout</Button>
				</form>
			{:else}
				<Button class="rounded" href="/auth/login/osu">Login with osu!</Button>
			{/if}
		</div>
	</div>

	<slot />
</div>
