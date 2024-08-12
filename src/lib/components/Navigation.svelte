<script lang="ts">
	import { Home, Search, ListMusic, Icon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
	import MobileNavigation from './MobileNavigation.svelte';
	import DesktopNavigation from './DesktopNavigation.svelte';

	let isDesktop = false;

	// Function to check the screen size
	function checkScreenSize() {
		isDesktop = window.innerWidth >= 1024;
	}

	// Set up an event listener to check the screen size on resize
	onMount(() => {
		checkScreenSize(); // Check initial screen size

		// Add event listener for window resize
		const mediaQuery = window.matchMedia('(min-width: 1024px)');
		mediaQuery.addEventListener('change', (event) => {
			isDesktop = event.matches;
		});
	});

	const menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic },
	];
</script>

<div class="nav-content">
	{#if isDesktop}
		<DesktopNavigation {menuItems} />
	{:else}
		<MobileNavigation {menuItems} />
	{/if}
</div>