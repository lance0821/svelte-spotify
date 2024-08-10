<script lang="ts">
	import '../app.postcss';
	import 'modern-normalize/modern-normalize.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: user = data.user;


</script>
<div id="main">
	<div id="content">
		<main id="main-content">
			<slot />
		</main>
	</div>
</div>

