<script lang="ts">
	import '../app.postcss';
	import 'modern-normalize/modern-normalize.css';
	import type { LayoutData } from './$types';
	import { Navigation } from '$components';

	let topbar: HTMLElement;
	let scrollY: number = 0;
	let headerOpacity = 0;

	$: if(topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	export let data: LayoutData;
	$: user = data.user;

	function handleScroll(event: Event) {
		scrollY = window.scrollY;
	}


</script>

<svelete:window on:scroll={handleScroll}/>

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<div id="topbar"
				 bind:this={topbar}
				 style="background-color: rgba(255, 255, 255, {headerOpacity});"
				 class="fixed w-full h-header-height px-4 flex items-center z-[100] md:px-[30px] md:w-[calc(100%-theme(spacing.sidebar-width))]">
			<div class="topbar-bg absolute w-full h-full top-0 left-0 z-[-1] bg-bg"/>
			topbar
		</div>
		<main id="main-content" class={user ? "pt-[calc(30px + theme(spacing.header-height))]" : ""}>
			<slot />
		</main>
	</div>
</div>

