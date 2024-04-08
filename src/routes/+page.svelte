<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import CreateEvent from '$lib/components/CreateEvent.svelte';
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';

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

	const days = makeMonth(31, 27);

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

<section>
	<DatePicker bind:isOpen bind:startDate>
		<input
			type="text"
			placeholder="Select date"
			bind:value={formattedStartDate}
			on:click={toggleDatePicker}
		/>
	</DatePicker>
	<button class="btn btn-primary" on:click={() => (showModal = true)}>Clique</button>
	<Calendar />
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
