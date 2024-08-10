<script>
	import {Button} from '$components';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import cover from '$assets/cover.png';
</script>

<div class="wrapper flex flex-col md:flex-row items-center w-full max-w-[1200px] mt-20 mx-auto mb-0">
	<div class="content flex-[1.8]">
		<img src={logo} class = "logo w-[170px] max-w-full mb-[30px]" alt="Spotify logo" />
		<h1 class="text-[40px]">Sign up now for 3 months of Premium</h1>
		<p class="text-[20px]">Enjoy ad-free music listening, offline playback, and more. Cancel anytime. </p>
		<div class="buttons mt-[40px] flex space-x-[10px]">
			<div class="px-[10px] py-[10px] uppercase">
				<Button
					element="a"
					variant="outline"
					href="https://www.spotify.com"
					target="_blank"
					rel="noopener noreferrer">Sign Up
				</Button>
			</div>
			<div class="px-[10px] py-[10px] uppercase">
				<Button
					element="a"
					href="/api/auth/login">Login
				</Button>
			</div>

		</div>

	</div>
	<div class="cover flex-1 mt-10 md:mt-0 md:ml-[20px]">
		<img src={cover} alt="Svelte album cover" class="max-w-full" />
	</div>
</div>