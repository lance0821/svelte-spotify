import type { LayoutServerLoad } from "./$types";
import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null
		};
	}

	try {
		const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (profileRes.ok) {
			const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
			return {
				user: profile
			};
		} if(profileRes.status === 401  && refreshToken) {
			// refresh the token and try again
			const  refreshRes = await fetch('api/auth/refresh');
			if(refreshRes.ok){
				throw redirect(307, new URL('api/auth/refresh', 'http://localhost').pathname);
			}
		} else {
			console.error('Failed to fetch profile:', profileRes.status, profileRes.statusText);
			return {
				user: null
			};
		}
	} catch (error) {
		console.error('Error fetching profile:', error);
		return {
			user: null
		};
	}
};
