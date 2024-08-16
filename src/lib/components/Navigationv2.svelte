<script>

import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

const menuItems = [
	{ path: '/', label: 'Home', icon: Home },
	{ path: '/search', label: 'Search', icon: Search },
	{ path: '/playlists', label: 'Playlists', icon: ListMusic },
];

</script>

<AppRail class="bg-sidebar p-5 h-screen">
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
</AppRail>