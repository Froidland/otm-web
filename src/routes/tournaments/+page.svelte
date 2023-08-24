<script lang="ts">
	import TournamentCard from '$lib/components/TournamentCard.svelte';
</script>

<svelte:head>
	<title>Tournaments</title>
</svelte:head>

<main class="flex gap-4 mx-64">
	<aside class="w-80 max-h-64 bg-osu rounded-xl p-3 shadow-xl">Side menu</aside>
	<div class="flex flex-col flex-1">
		<div class="w-full bg-osu h-16 rounded-xl shadow-xl p-3 mb-3"></div>
		<div class="flex justify-center">
			<ul class="flex flex-col flex-1 gap-4">
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
				<TournamentCard tournamentCreator="Pancho" tournamentName="Test Tournament" />
			</ul>
		</div>
	</div>
</main>
