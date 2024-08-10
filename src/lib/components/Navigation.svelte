<script lang="ts">
	import {Home, Search, ListMusic, type Icon} from 'lucide-svelte'
	import {page} from '$app/stores';
	import type {ComponentType} from 'svelte';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	export let desktop: boolean;

	const menuItems : {path: string, label: string, icon: ComponentType<Icon>}[] = [
		{ path: '/',
			label: 'Home',
			icon: Home
		},
		{ path: '/search',
			label: 'Search',
			icon: Search
		},
		{ path: '/playlists',
			label: 'Playlists',
			icon: ListMusic
		},
	];
</script>

<div class="nav-content">
	<nav aria-label="Main">
		<div class="nav-content-inner p-5 min-w-sidebar-width h-screen overflow-auto bg-sidebar lg:block hidden lg:sticky lg:top-0">
			<img src={logo} class="logo  max-w-full w-[130px]" alt="Spotify" />
			<ul class="p-0 m-5 list-none">
				{#each menuItems as item}
					<li class={`transition-opacity duration-200 hover:opacity-100 focus:opacity-100 ${item.path === $page.url.pathname ? 'opacity-100' : 'opacity-50'}`}>
						<a class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]" href={item.path}>
							<svelte:component class='mr-[12px]' this="{item.icon}" focusable="false" aria-hidden="true" size="26" />
							{item.label}
						</a>
					</li>
					{/each}
			</ul>
		</div>
	</nav>
</div>