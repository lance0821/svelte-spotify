import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'
import { spotifyTheme } from './spotify-theme';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			fontFamily: {
				metropolis: ['Metropolis', 'sans-serif'],
			},
			colors: {
				'bg': '#191414',
				'sidebar': '#000',
				'header': '#000',
				'text': '#fff',
				'accent': '#1db954',
				'menu-background': '#2e2e2e',
				'light-gray': '#a7a7a7',
				'medium-gray': '#2e2e2e',
				'dark-gray': '#181818',
				'menu-text': '#fff',
				'border': 'rgba(255, 255, 255, 0.15)',
				'error': '#c24141',
				'warning': '#e7a917',
			},
			spacing: {
				'sidebar-width': '250px',
				'header-height': '64px',
			},
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [],
				custom: [spotifyTheme],
			},
		}),
	],
} satisfies Config;
