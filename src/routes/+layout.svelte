<script lang="ts">
	import '../app.postcss';
	import 'modern-normalize/modern-normalize.css';
	import type { LayoutData } from './$types';
	import { Navigation } from '$components';

	export let data: LayoutData;
	$: user = data.user;


</script>
<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<main id="main-content">
			<slot />
		</main>
	</div>
</div>

