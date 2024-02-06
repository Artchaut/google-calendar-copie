<script>
	export let data;

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	if (data.error) {
		session = false
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if !session}
		<a href="/login" class="btn btn-primary">Se connecter</a>
	{:else}
		<h1>Bonjour, {profile?.full_name === undefined ?  "" : profile.full_name}</h1>
	{/if}
</section>
