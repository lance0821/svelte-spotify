import type { RequestHandler } from '@sveltejs/kit';
import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET } from '$env/static/private';
import { error} from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
	const refreshToken = cookies.get('refresh_token');

	if (!refreshToken) {
		return new Response(JSON.stringify({ error: 'No refresh token found' }), {status: 400})
	}

	try {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`
				).toString('base64')}`
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			return new Response(JSON.stringify({ error: errorResponse.error_description || 'Failed to refresh token' }),{status: response.status})
		}

		const responseJSON = await response.json();
		console.log(responseJSON);
		if(responseJSON.error) {
			cookies.delete('refresh_token', {path: '/'});
			cookies.delete('access_token', {path: '/'});
			throw error(401, responseJSON.error_description);
		}

		// Store the new access token in cookies
		cookies.set('access_token', responseJSON.access_token, { path: '/' });

		// Optionally store a new refresh token if one is provided in the response
		if (responseJSON.refresh_token) {
			cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
		}

		return new Response(JSON.stringify({access_token: responseJSON.access_token}), {status: 200});
	} catch (error) {
		console.error('Error refreshing token:', error);
		return new Response(JSON.stringify({error: 'Internal Server Error'}), {status: 500})
	}
};
