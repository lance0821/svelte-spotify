<script lang="ts">
	import '../app.postcss';
	import 'modern-normalize/modern-normalize.css';
	import type { LayoutData } from './$types';
	import type { ComponentType } from 'svelte';
	import { Navigation, Header, IconButton } from '$components';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { X, Icon, Home, Search, ListMusic } from 'lucide-svelte';

	// Initialize Skeleton stores
	initializeStores();

	// Get the store for the drawer
	const drawerStore = getDrawerStore();

	// Changes top  bar color and opacity.
	let topbar: HTMLElement;
	let scrollY: number = 0;
	let headerOpacity = 0;

	$: if(topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	export let data: LayoutData;
	export let menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic },
	];
	$: user = data.user;

	function handleScroll(event: Event) {
		scrollY = window.scrollY;
	}

</script>

<svelete:window on:scroll={handleScroll}/>
<Drawer side="left" class="lg:hidden z-[9999]">
	<div class="p-5 bg-sidebar h-full">
		<!-- Close Button -->
		<IconButton icon={X} label="Close menu" class="mb-4 text-white"
								on:click={() => drawerStore.close()} />

		<ul class="list-none">
			{#each menuItems as item}
				<li class="my-2">
					<a href={item.path} class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium">
						<svelte:component this={item.icon} size="26" aria-hidden="true" />
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Drawer>

<div id="main">
	{#if user}
		<div id="sidebar" class="lg:block hidden">
			<Navigation/>
		</div>
	{/if}
	<div id="content">
		<div id="topbar"
				 bind:this={topbar}
				 style="background-color: rgba(255, 255, 255, {headerOpacity});"
				 class="fixed w-full h-header-height px-4 flex items-center z-[100] md:px-[30px] md:w-[calc(100%-theme(spacing.sidebar-width))]">
			<div class="topbar-bg absolute w-full h-full top-0 left-0 z-[-1] bg-bg"/>
			<Header />
		</div>
		<main id="main-content" class={user ? "pt-[calc(30px + theme(spacing.header-height))]" : ""}>
			<slot />
		</main>
	</div>
</div>

