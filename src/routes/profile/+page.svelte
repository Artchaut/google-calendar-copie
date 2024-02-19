<script lang="ts">
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

{#if !session}
	<h1 class="mb-14 mt-14 text-3xl text-primary">
		Vous n'êtes pas connecté et n'avez donc pas de profil
	</h1>

	<a href="/login" class="btn btn-primary">Se connecter</a>
{:else}
	<h1>Bienvenue sur votre profil</h1>
{/if}
