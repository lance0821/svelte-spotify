<script>
import { invalidateAll } from '$app/navigation';
</script>
<form method="post" action="api/auth/logout" on:submit|preventDefault={async () =>{
		const response = await fetch('api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
		});
		if(response.ok){
			invalidateAll();
		}
	}}>
	<button type="submit" class="bg-white text-black py-2 px-4 rounded hover:bg-gray-200">Logout</button>
</form>