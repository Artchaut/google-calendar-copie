<script lang="ts">
	import CreateEvent from '$lib/components/CreateEvent.svelte';
	import MonthlyCalendar from '$lib/components/MonthlyCalendar.svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';

	// get data from load function
	export let data: PageData;

	console.log(data);

	let { supabase, session, e } = data;
	$: ({ supabase, session, e } = data);

  $: events = e === undefined ? [] : e;


	let showModal: boolean;
	let loading: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex w-full flex-row">
	<div>
		<div id="comming-events" class="mb-7 flex flex-col">
			<h1 class="text-base font-bold text-gray-800 focus:outline-none dark:text-gray-100">
				<span class="text-primary mr-3">Évènement à venir</span>
				<button class="btn btn-outline btn-primary" on:click={() => (showModal = true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					Ajouter
				</button>
			</h1>
			{#if data.error}
				<div role="alert" class="alert alert-error mt-3 mb-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Erreur! Les données n'ont pas été chargées.</span>
				</div>
			{:else}
				<ul>
					{#each events as event}
						<li>{event}</li>
					{:else}
						Vous n'avez aucun évènement à venir
					{/each}
				</ul>
			{/if}
		</div>
		<hr />

		<div id="bazar" class="mt-7 flex flex-col">
			<button class="btn btn-primary" on:click={() => (showModal = true)}>Clique</button>
		</div>
	</div>
	<MonthlyCalendar />
</section>

<CreateEvent bind:showModal>
	<form method="post" class="flex w-full flex-col place-items-center" use:enhance={handleSubmit}>
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
		<button class="btn btn-primary" type="submit">Créer</button>
	</form>
</CreateEvent>

<style>
	input[type='text'] {
		border: 1px solid #eee;
		border-radius: 20px;
		padding: 8px;
	}
</style>
