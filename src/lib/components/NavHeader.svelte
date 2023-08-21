<script lang="ts">
	import { Button } from './ui/button';
</script>

<div class="flex items-center justify-between px-4 py-4 bg-zinc-800 rounded-xl my-4">
	<nav class="flex gap-4">
		<Button class="rounded" href="/">Home</Button>
		<Button class="rounded" href="/tournaments">Tournaments</Button>
		<Button class="rounded" href="/tryouts">Tryouts</Button>
	</nav>
	<Button href="/auth/login/osu" class="rounded">Login with osu!</Button>
</div>
