/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#000',
				secondary: '#22C55E',
				background: '#fff',
				textPrimary: '#000',
				textSecondary: '#B9B4E4',
				danger: '#EF4444',
				success: '#10B981',
				warning: '#F59E0B',
				NeutralGray: '#E6E6E6',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}