<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import Modal from '$lib/components/Modal.svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const day_name: string[] = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
		'Dimanche'
	];
	const makeMonth = (n_days: number, f_day: number) => {
		const days: Day[] = [];
		for (let i = 0; i < 35; i++) {
			const day_n: string = day_name[f_day];
			const day = { name: day_n, is_activated: false };
		}

		return days;
	};

	const days = makeMonth(29, 3);

	let showModal: boolean;
	let loading: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			setTimeout(() => {
				loading = false;
				() => (showModal = false);
			}, 5000);
		};
	};

	const contacts = ['Personne 1', 'Personne 2'];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<button class="btn btn-primary" on:click={() => (showModal = true)}>Clique</button>
	<Calendar {days} />
</section>

<Modal bind:showModal>
	<form method="post" class="flex w-full flex-col place-items-center" use:enhance={handleSubmit}>
		{#if loading === true}
			<span class="loading loading-infinity loading-lg"></span>
		{:else}
			<h1 class="mb-6 text-2xl text-primary">Créer un Evènement</h1>
			<input
				class="input input-bordered input-primary mb-4"
				type="text"
				name="name"
				placeholder="Nom de l'évènement"
				disabled={loading}
			/>
			<input
				class="input input-bordered input-primary mb-4"
				type="text"
				name="description"
				placeholder="Description"
				disabled={loading}
			/>
			<input
				class="input input-bordered input-primary mb-4"
				type="datetime-local"
				name="beginning"
				placeholder="Début"
				disabled={loading}
			/>
			<input
				class="input input-bordered input-primary mb-4"
				type="datetime-local"
				name="ending"
				placeholder="Fin"
				disabled={loading}
			/>

			<!-- ici ajouter une élément permettant de choisir des collabateurs-->
			<select class="select select-primary">
				<option value="">Ajoutez des collaborateurs (Optionnel) </option>
				{#each contacts as contact}
					<option value={contact}>{contact}</option>
				{/each}
			</select>
			<button class="btn btn-primary" type="submit">Créer</button>
		{/if}
	</form>
</Modal>
