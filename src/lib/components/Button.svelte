<script lang="ts">
	import type {HTMLAnchorAttributes, HTMLButtonAttributes} from 'svelte/elements';

	type Element = $$Generic<'button' | 'a'>
	interface ButtonComponentElements {
		button: HTMLButtonAttributes;
		a: HTMLAnchorAttributes;
	}
	type $$Props = ButtonComponentElements[Element] & {
		element: Element;
		variant: 'solid' | 'outline' | 'danger';
		className: string;
	};

	export let element: Element;
	export let variant: 'solid' | 'outline' | 'danger' = 'solid';
	export let className: string = '';
</script>

<svelte:element
	this={element}
	class="button button-{variant} {className}"
	on:click
	{...$$restProps}>
<slot />
</svelte:element>