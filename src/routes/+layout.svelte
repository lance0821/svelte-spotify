<script lang="ts">
	import '../app.postcss';
	import 'modern-normalize/modern-normalize.css';
	import type { LayoutData } from './$types';
	import {LogoutButton} from '$components';

	export let data: LayoutData;
	$: user = data.user;
	console.log(user);

</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<LogoutButton />
{:else}
	<p>User not logged in or failed to fetch profile</p>
{/if}

<slot />
