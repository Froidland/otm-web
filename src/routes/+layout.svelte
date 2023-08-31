<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	$: currentRoute = $page.route.id;
</script>

<div class="container">
	<nav class="flex items-center justify-between p-3 bg-osu rounded-xl my-4 shadow-xl">
		<div class="flex gap-4">
			<Button
				class="rounded {currentRoute === '/' ? 'text-white bg-slate-600 hover:bg-slate-600' : ''}"
				href="/">Home</Button
			>
			<Button
				class="rounded {currentRoute === '/tournaments'
					? 'text-white bg-slate-600 hover:bg-slate-600'
					: ''}"
				href="/tournaments">Tournaments</Button
			>
			<Button
				class="rounded {currentRoute === '/tryouts'
					? 'text-white bg-slate-600 hover:bg-slate-600'
					: ''}"
				href="/tryouts">Tryouts</Button
			>
		</div>
		<div class="flex gap-4">
			{#if data.isLoggedIn}
				<Button
					class="rounded {currentRoute === '/profile/me'
						? 'text-white bg-slate-600 hover:bg-slate-600'
						: ''}"
					href="/profile/me">Profile</Button
				>
				<Button href="/api/auth/logout" class="rounded" variant="destructive">Logout</Button>
			{:else}
				<Button class="rounded" href="/api/auth/login/osu">Login with osu!</Button>
			{/if}
		</div>
	</nav>
	<slot />
</div>
