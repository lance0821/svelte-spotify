<script lang="ts">
	import { Home, Search, ListMusic, type Icon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	// Mobile menu state
	let isMobileMenuOpen = false;
	let closeButton: HTMLButtonElement;
	let openButton: HTMLButtonElement;


	const menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic },
	];
	// Function to toggle the mobile menu open/closed
	const toggleMobileMenu = async () => {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) {
			await tick();
			closeButton?.focus();
		} else {
			await tick();
			openButton?.focus();
		}
	};
	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});
</script>
<svelte:head>
	{#if isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
		{/if}
</svelte:head>

<div class="nav-content">
	{#if isMobileMenuOpen}
		<div class="overlay fixed inset-0 bg-sidebar opacity-75 z-[100] md:hidden"
				 on:click={toggleMobileMenu}
				 transition:fade={{duration: 200}}
				 aria-hidden="true"></div>
		{/if}
	<nav aria-label="Main">
		<!-- Mobile Menu Button (only visible on small screens) -->
		<button
			bind:this={openButton}
			class="p-2 bg-gray-800 text-white rounded-md lg:hidden"
			on:click={toggleMobileMenu}
			aria-expanded={isMobileMenuOpen}
			aria-controls="nav-content-inner">
			{isMobileMenuOpen ? 'Close' : 'Open'}
		</button>

		<!-- Sidebar Navigation -->
		<div
			class={`fixed top-0 z-[110] p-5 min-w-sidebar-width
							h-screen overflow-auto bg-sidebar transition-transform
							duration-300 transform lg:translate-x-0
							${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
							lg:block lg:sticky lg:top-0`}
		>
			<!-- Close Button (visible only on mobile) -->
			<button
				bind:this={closeButton}
				class="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 lg:hidden"
				on:click={toggleMobileMenu}
				aria-label="Close menu"
			>
				&times; <!-- This is the "X" character -->
			</button>
			<img src={logo} class="logo max-w-full w-[130px]" alt="Spotify" />
			<ul class="p-0 m-5 list-none">
				{#each menuItems as item}
					<li class={`transition-opacity duration-200 hover:opacity-100 focus:opacity-100 ${item.path === $page.url.pathname ? 'opacity-100' : 'opacity-50'}`}>
						<a class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]" href={item.path}>
							<svelte:component class="mr-[12px]" this="{item.icon}" focusable="false" aria-hidden="true" size="26" />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
