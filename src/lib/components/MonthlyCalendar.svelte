<script lang="ts">
	import MonthlyDays from './MonthlyDays.svelte';

	const date = new Date();

	let month: string;
	let year: number;

	let days: number[] = [];
	let today: number = 0;

	const months = [
		'Janvier',
		'Fevrier',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Aout',
		'Septembre',
		'Octobre',
		'Novembre',
		'Decembre'
	];

	const renderCalendar = async () => {
		date.setDate(1);
		days = [];
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

		const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

		const firstDayIndex = date.getDay();

		const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

		const nextDays = 7 - lastDayIndex - 1;

		month = months[date.getMonth()];
		year = date.getFullYear();

		for (let x = firstDayIndex; x > 0; x--) {
			days.push(prevLastDay - x + 1);
		}

		for (let i = 1; i <= lastDay; i++) {
			if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
				days.push(i);
				today = i;
			} else {
				days.push(i);
			}
		}

		for (let j = 1; j <= nextDays; j++) {
			days.push(j);
		}
		days.shift();
		return days;
	};

	const prevMonth = () => {
		setTimeout(() => {
			date.setMonth(date.getMonth() - 1);
			today = -1;
			renderCalendar();
		}, 500);
	};
	const nextMonth = () => {
		setTimeout(() => {
			date.setMonth(date.getMonth() + 1);
			today = -1;
			renderCalendar();
		}, 500);
	};

	$: t = today;
	$: d = days;
</script>

{#await renderCalendar()}
	<p>wait..</p>
{:then days}
	<table id="calendar" class="w-full">
		<thead class="flex flex-row space-x-5">
			<button id="month-prev" class="btn btn-circle" on:click={prevMonth}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<h1 id="month">{month} {year}</h1>
			<button id="month-next" class="btn btn-circle" on:click={nextMonth}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</thead>

		<div id="calendar-body" class="flex flex-col items-center justify-between overflow-x-auto pt-6">
			<thead>
				<tr>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Lun</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Mar</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Mer</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text- text-center font-medium text-gray-800 dark:text-gray-100">Jeu</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Ven</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Sam</p>
						</div>
					</th>
					<th>
						<div class="flex w-full justify-center">
							<p class="text-center text-base font-medium text-gray-800 dark:text-gray-100">Dim</p>
						</div>
					</th>
				</tr>
			</thead>
			{#key d}
				<MonthlyDays days={d} today={t} />
			{/key}
		</div>
	</table>
{/await}
