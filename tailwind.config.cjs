/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require("daisyui")],

	daisyui: {
		themes: ["sunset", "dracula"],
		default: "dracula"
	}
};

module.exports = config;
