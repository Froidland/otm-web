<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="bg-zinc-800 rounded-xl p-4">
	<p>osu! username: <span class="text-pink-300">{data.user.osu_username}</span></p>
</div>
