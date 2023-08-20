<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div
	class="bg-osu flex flex-col justify-center items-center w-[400px] h-[200px] rounded-xl p-3 gap-10"
>
	<h1 class="text-4xl font-medium">Login</h1>
	<Button class="rounded bg-pink-300 hover:bg-pink-400" href="/api/auth/login/osu"
		>Sign in with osu!</Button
	>
</div>
