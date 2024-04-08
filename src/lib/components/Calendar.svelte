<script lang="ts">
	import { onMount } from 'svelte';

	let date = new Date();

	let month: string;
	let year: number;

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
		let days: number[] = [];

		date.setDate(1);

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
				const today = i;
			} else {
				days.push(i);
			}
		}

		for (let j = 1; j <= nextDays; j++) {
			days.push(j);
		}
		return days;
	};

	const prevMonth = () => {
		setTimeout(() => {
			date.setMonth(date.getMonth() - 1);
			renderCalendar();
		}, 500);
	};
	const nextMonth = () => {
		setTimeout(() => {
			date.setMonth(date.getMonth() + 1);
			renderCalendar();
		}, 500);
	};
</script>

<!-- <table bgcolor="lightgrey" align="center" cellspacing="32" cellpadding="32">
	<caption> </caption>

	<thead>
		<tr>
			<th class="bg-accent text-white">Lun</th>
			<th class="bg-accent text-white">Mar</th>
			<th class="bg-accent text-white">Mer</th>
			<th class="bg-accent text-white">Jeu</th>
			<th class="bg-accent text-white">Ven</th>
			<th class="bg-accent text-white">Sam</th>
			<th class="bg-accent text-white">Dim</th>
		</tr>
	</thead>

	<tbody>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td>1</td>
			<td>2</td>
		</tr>
		<tr></tr>
		<tr>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td>6</td>
			<td>7</td>
			<td>8</td>
			<td>9</td>
		</tr>
		<tr>
			<td>10</td>
			<td>11</td>
			<td>12</td>
			<td>13</td>
			<td>14</td>
			<td>15</td>
			<td>16</td>
		</tr>
		<tr>
			<td>17</td>
			<td>18</td>
			<td>19</td>
			<td>20</td>
			<td>21</td>
			<td>22</td>
			<td>23</td>
		</tr>
		<tr>
			<td>24</td>
			<td>25</td>
			<td>26</td>
			<td>27</td>
			<td>28</td>
			<td>29</td>
			<td>30</td>
		</tr>
		<tr>
			<td>31</td>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
			<td>6</td>
		</tr>
	</tbody>
</table> -->

{#await renderCalendar()}
	<p>wait..</p>
{:then days}
	<div id="calendar">
		<div id="calendar-header" class="flex flex-row space-x-5">
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
		</div>

		<div id="calendar-body">
			<th>Lun</th>
			<th>Mar</th>
			<th>Mer</th>
			<th>Jeu</th>
			<th>Ven</th>
			<th>Sam</th>
			<th>Dim</th>

			{#each days as day}
				<td>{day}</td>
			{/each}
		</div>
	</div>
{/await}

<style>
	td {
		color: grey;
	}
</style>
