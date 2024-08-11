<script lang="ts">
	import type {Icon} from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes{
		icon: ComponentType<Icon>
		label: string;
	}
	export let icon: ComponentType<Icon>
	export let label: string;
</script>

<button on:click on:mouseover on:focus on:keydown {...$$restProps}
				class="flex items-center justify-center border-none, bg-none, cursor-pointer, p-0, w-[38px], h-[38px], text-text">
	<svelte:component this={icon} aria-hidden="true" focusable="false"/>
	<span class="sr-only">{label}</span>
</button>
