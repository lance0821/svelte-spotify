<!--<script lang="ts">-->
<!--	import { Menu, X, Icon } from 'lucide-svelte';-->
<!--	import { IconButton } from '$components';-->
<!--	import type { ComponentType } from 'svelte';-->
<!--	import { page } from '$app/stores';-->
<!--	import { tick } from 'svelte';-->
<!--	import { fade } from 'svelte/transition';-->

<!--	export let menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [];-->
<!--	let isMobileMenuOpen = false;-->
<!--	let closeButtonElement: HTMLButtonElement;-->
<!--	let openButtonElement: HTMLButtonElement;-->
<!--	let lastFocusableElement: HTMLElement;-->

<!--	const toggleMobileMenu = async () => {-->
<!--		isMobileMenuOpen = !isMobileMenuOpen;-->
<!--		await tick();-->
<!--		if (isMobileMenuOpen) {-->
<!--			closeButtonElement?.focus();-->
<!--		} else {-->
<!--			openButtonElement?.focus();-->
<!--		}-->
<!--	};-->

<!--	const moveFocusToBottom = (e: KeyboardEvent) => {-->
<!--		if (!isMobileMenuOpen) return;-->
<!--		if (e.key === 'Tab' && e.shiftKey) {-->
<!--			e.preventDefault();-->
<!--			lastFocusableElement.focus();-->
<!--		}-->
<!--	};-->

<!--	const moveFocusToTop = (e: KeyboardEvent) => {-->
<!--		if (!isMobileMenuOpen) return;-->
<!--		if (e.key === 'Tab' && !e.shiftKey) {-->
<!--			e.preventDefault();-->
<!--			closeButtonElement?.focus();-->
<!--		}-->
<!--	};-->

<!--	const handleEscape = (e: KeyboardEvent) => {-->
<!--		if (e.key === 'Escape') {-->
<!--			isMobileMenuOpen = false;-->
<!--			openButtonElement?.focus();-->
<!--		}-->
<!--	};-->
<!--</script>-->

<!--<svelte:head>-->
<!--	{#if isMobileMenuOpen}-->
<!--		<style>-->
<!--        body {-->
<!--            overflow: hidden;-->
<!--        }-->
<!--		</style>-->
<!--	{/if}-->
<!--</svelte:head>-->

<!--{#if isMobileMenuOpen}-->
<!--	<div class="overlay fixed inset-0 bg-sidebar opacity-75 z-[100] md:hidden"-->
<!--			 on:keyup={handleEscape}-->
<!--			 on:click={toggleMobileMenu}-->
<!--			 transition:fade={{duration: 200}}-->
<!--			 aria-hidden="true"></div>-->
<!--{/if}-->

<!--&lt;!&ndash; Mobile Menu Button &ndash;&gt;-->
<!--<IconButton icon={Menu} label="Open menu" bind:ref={openButtonElement}-->
<!--						class="p-2 bg-gray-800 text-white rounded-md lg:hidden"-->
<!--						on:click={toggleMobileMenu}-->
<!--						aria-expanded={isMobileMenuOpen}-->
<!--						aria-controls="nav-content-inner"/>-->

<!--&lt;!&ndash; Mobile Sidebar &ndash;&gt;-->
<!--<nav-->
<!--	class={`fixed top-0 z-[110] p-5 min-w-sidebar-width-->
<!--						h-screen overflow-auto bg-sidebar transition-transform-->
<!--						duration-300 transform lg:translate-x-0-->
<!--						${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}-->
<!--						lg:block lg:sticky lg:top-0`}-->
<!--	on:keyup={handleEscape}-->
<!--	role="navigation"-->
<!--	aria-label="Mobile Navigation"-->
<!--&gt;-->
<!--	<IconButton icon={X} label="Close menu" bind:ref={closeButtonElement}-->
<!--							class="p-2 bg-gray-800 text-white rounded-md lg:hidden"-->
<!--							on:click={toggleMobileMenu}-->
<!--							on:keydown={moveFocusToBottom}-->
<!--							aria-expanded={isMobileMenuOpen}-->
<!--							aria-controls="nav-content-inner"-->
<!--							aria-label="Close menu"/>-->

<!--	<ul class="p-0 m-5 list-none">-->
<!--		{#each menuItems as item, index}-->
<!--			{@const iconProps ={-->
<!--				focusable: "false",-->
<!--				'aria-hidden': "true",-->
<!--				size: "26"-->
<!--			}}-->
<!--			<li class={`transition-opacity duration-200 hover:opacity-100 focus:opacity-100 ${item.path === $page.url.pathname ? 'opacity-100' : 'opacity-50'}`}>-->
<!--				{#if menuItems.length === index + 1}-->
<!--					<a-->
<!--						bind:this={lastFocusableElement}-->
<!--						class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]"-->
<!--						on:keydown={moveFocusToTop}-->
<!--						href={item.path}>-->
<!--						<svelte:component class="mr-[12px]" this="{item.icon}" {...iconProps} />-->
<!--						{item.label}-->
<!--					</a>-->
<!--				{:else}-->
<!--					<a class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]" href={item.path}>-->
<!--						<svelte:component class="mr-[12px]" this="{item.icon}" {...iconProps} />-->
<!--						{item.label}-->
<!--					</a>-->
<!--				{/if}-->
<!--			</li>-->
<!--		{/each}-->
<!--	</ul>-->
<!--</nav>-->

<script lang="ts">
	import { Menu, X, Icon } from 'lucide-svelte';
	import { IconButton } from '$components';
	import type { ComponentType } from 'svelte';
	import {onDestroy} from 'svelte';
	import { page } from '$app/stores';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [];
	let isMobileMenuOpen = false;
	let closeButtonElement: HTMLButtonElement;
	let openButtonElement: HTMLButtonElement;
	let lastFocusableElement: HTMLElement;

	const toggleMobileMenu = async () => {
		isMobileMenuOpen = !isMobileMenuOpen;
		await tick();
		if (isMobileMenuOpen) {
			closeButtonElement?.focus();
			document.addEventListener('keyup', handleEscape);
		} else {
			openButtonElement?.focus();
			document.removeEventListener('keyup', handleEscape);
		}
	};

	const moveFocusToBottom = (e: KeyboardEvent) => {
		if (!isMobileMenuOpen) return;
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			lastFocusableElement.focus();
		}
	};

	const moveFocusToTop = (e: KeyboardEvent) => {
		if (!isMobileMenuOpen) return;
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			closeButtonElement?.focus();
		}
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			isMobileMenuOpen = false;
			openButtonElement?.focus();
			document.removeEventListener('keyup', handleEscape);
		}
	};

	onDestroy(() => {
		document.removeEventListener('keyup', handleEscape);
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

{#if isMobileMenuOpen}
	<div class="overlay fixed inset-0 bg-sidebar opacity-75 z-[100] md:hidden"
			 on:keyup={handleEscape}
			 on:click={toggleMobileMenu}
			 transition:fade={{duration: 200}}
			 aria-hidden="true"></div>
{/if}

<!-- Mobile Menu Button -->
<IconButton icon={Menu} label="Open menu" bind:ref={openButtonElement}
						class="p-2 bg-gray-800 text-white rounded-md lg:hidden"
						on:click={toggleMobileMenu}
						aria-expanded={isMobileMenuOpen}
						aria-controls="nav-content-inner"/>

<!-- Mobile Sidebar -->
<nav
	class={`fixed top-0 z-[110] p-5 min-w-sidebar-width
						h-screen overflow-auto bg-sidebar transition-transform
						duration-300 transform lg:translate-x-0
						${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
						lg:block lg:sticky lg:top-0`}
	aria-label="Mobile Navigation"
>

	<IconButton icon={X} label="Close menu" bind:ref={closeButtonElement}
							class="p-2 bg-gray-800 text-white rounded-md lg:hidden"
							on:click={toggleMobileMenu}
							on:keydown={moveFocusToBottom}
							aria-expanded={isMobileMenuOpen}-
							aria-controls="nav-content-inner"
							aria-label="Close menu"/>

	<ul class="p-0 m-5 list-none">
		{#each menuItems as item, index}
			{@const iconProps ={
				focusable: "false",
				'aria-hidden': "true",
				size: "26"
			}}
			<li class={`transition-opacity duration-200 hover:opacity-100 focus:opacity-100 ${item.path === $page.url.pathname ? 'opacity-100' : 'opacity-50'}`}>
				{#if menuItems.length === index + 1}
					<a
						bind:this={lastFocusableElement}
						class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]"
						on:keydown={moveFocusToTop}
						href={item.path}>
						<svelte:component class="mr-[12px]" this="{item.icon}" {...iconProps} />
						{item.label}
					</a>
				{:else}
					<a class="flex items-center space-x-2 no-underline text-text text-[14px] font-medium p-[5px] my-[10px]" href={item.path}>
						<svelte:component class="mr-[12px]" this="{item.icon}" {...iconProps} />
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
