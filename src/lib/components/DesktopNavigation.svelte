<script lang="ts">
	import { Home, Search, ListMusic, Icon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';
	import logo from '$assets/Spotify_Logo_RGB_White.png';

	export let menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [];
</script>

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
