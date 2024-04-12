<script lang="ts">
	import CreateEvent from '$lib/components/CreateEvent.svelte';
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import MonthlyCalendar from '$lib/components/MonthlyCalendar.svelte';

	export let data;

	let { session, supabase, events } = data;
	$: ({ session, supabase, events } = data);

	console.log(data);

	let showModal: boolean;
	let loading: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	let startDate = new Date();
	let dateFormat = 'dd/MM/yyyy';
	let isOpen = false;

	const toggleDatePicker = () => (isOpen = !isOpen);

	const formatDate = (dateString: string | number | Date) => {
		return (dateString && format(new Date(dateString), dateFormat)) || '';
	};

	let formattedStartDate = formatDate(startDate);

	const onChange = () => {
		startDate = new Date(formattedStartDate);
	};

	$: formattedStartDate = formatDate(startDate);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex w-full flex-row">
	<div>
		<div id="comming-events" class="mb-7 flex flex-col">
			<h1 class="text-base font-bold text-gray-800 focus:outline-none dark:text-gray-100">
				<span>Évènement à venir</span>
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
			<ul>
				<!-- {#each events.data as event}
					<li>{event}</li>
				{:else}
					No Events 
				{/each} -->
			</ul>
		</div>
		<hr />

		<div id="bazar" class="mt-7 flex flex-col">
			<DatePicker bind:isOpen bind:startDate class="mt-7">
				<input
					type="text"
					placeholder="Select date"
					bind:value={formattedStartDate}
					on:click={toggleDatePicker}
				/>
			</DatePicker>
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
