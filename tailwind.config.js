// Import du plugin en utilisant ESM
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: false,
	content: [
		"./index.html",
		"./src/**/*.{vue,js,jsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				card: 'var(--card)',
				'card-foreground': 'var(--card-foreground)',
				popover: 'var(--popover)',
				'popover-foreground': 'var(--popover-foreground)',
				primary: 'var(--primary)',
				'primary-foreground': 'var(--primary-foreground)',
				secondary: 'var(--secondary)',
				'secondary-foreground': 'var(--secondary-foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				accent: 'var(--accent)',
				'accent-foreground': 'var(--accent-foreground)',
				destructive: 'var(--destructive)',
				'destructive-foreground': 'var(--destructive-foreground)',
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				'chart-1': 'var(--chart-1)',
				'chart-2': 'var(--chart-2)',
				'chart-3': 'var(--chart-3)',
				'chart-4': 'var(--chart-4)',
				'chart-5': 'var(--chart-5)',
			},
			fontFamily: {
				Bebas: ['Bebas Neue', 'sans-serif'],
				Source: ['Source Sans 3', 'sans-serif'],
			}
		}
	},
	plugins: [
		tailwindcssAnimate,
	],
};

export default config;
