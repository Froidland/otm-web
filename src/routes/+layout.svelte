<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import type { LayoutServerData } from './$types';

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
				<Button href="/api/logout" class="rounded" variant="destructive">Logout</Button>
			{:else}
				<Button class="rounded" href="/auth/login/osu">Login with osu!</Button>
			{/if}
		</div>
	</div>

	<slot />
</div>
