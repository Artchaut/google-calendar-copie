<script lang="ts">
	import Calendar from '$lib/components/calendar.svelte';

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
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Calendar {days} />
</section>
