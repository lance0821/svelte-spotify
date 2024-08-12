<script lang="ts">
	import { Home, Search, ListMusic, Icon, Menu } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
	import { type DrawerSettings, getDrawerStore } from '@skeletonlabs/skeleton';
	import { IconButton } from '$components';
	import logo from '$assets/Spotify_Logo_RGB_White.png';

	const drawerStore = getDrawerStore();
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

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		bgDrawer: 'bg-sidebar',
		bgBackdrop: 'opacity-50 bg-black',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	};

	const menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic },
	];
</script>

<div class="nav-content">
	{#if isDesktop}
		<nav aria-label="Desktop Navigation" class="hidden lg:block lg:sticky lg:top-0 bg-sidebar p-5 min-w-sidebar-width h-screen">
		<img src={logo} class="logo max-w-full w-[130px]" alt="Spotify" />
		<ul class="p-0 m-5 list-none">
			{#each menuItems as item}
				<li class={`transition-opacity duration-200 hover:opacity-100 focus:opacity-100 ${item.path === $page.url.pathname ? 'opacity-100' : 'opacity-50'}`}>
					<a class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]" href={item.path}>
						<svelte:component class="mr-[12px]" this="{item.icon}" />
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	{:else}
		<!-- Mobile Menu Button -->
		<IconButton icon={Menu} label="Open menu"
								class="p-2 bg-gray-800 text-white rounded-md lg:hidden"
								on:click={() => drawerStore.open(drawerSettings)} />
	{/if}
</div>