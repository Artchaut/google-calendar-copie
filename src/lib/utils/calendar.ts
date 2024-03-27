interface Day {
	name: string[];
	is_activated: boolean;
}

interface Month {
	name: month_name;
	day_number: number;
	first_day: number;
	days: Day[];
}

type month_name = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre'
];
