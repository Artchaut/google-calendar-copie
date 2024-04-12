<script>
	import Notification from '$lib/components/Notification.svelte';

	let afficher = false;
	let c = 'Bouton';

	$: afficher ? (c = 'Fermer') : (c = 'Bouton');
</script>

<button
	on:click={function () {
		afficher = !afficher;
	}}>{c}</button
>

{#if afficher}
	<Notification alert_text={'Hello '} classname={'alert alert-info w-50'} />
{/if}
