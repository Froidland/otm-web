<script lang="ts">
	import Button from "./ui/button/button.svelte";

	export let tournamentName = '';
	export let tournamentCreator = '';
</script>

<article class="flex justify-between items-center h-36 bg-osu shadow-xl rounded-xl p-3">
	<div class="flex gap-2 items-center">
		<a class="text-xl font-semibold" href="/">{tournamentName}</a>
		<p class="text-sm">by <a class="underline hover:text-[#e9c2ff]" href="/">{tournamentCreator}</a></p>
	</div>
	<div>
		<Button class="rounded">Join</Button>
	</div>
</article>
