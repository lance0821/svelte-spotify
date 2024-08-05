import type { RequestHandler } from '@sveltejs/kit';
import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET, BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('spotify_auth_state');
	const storedChallengeVerifier = cookies.get('spotify_auth_challenge_verifier');

	if (!state || state !== storedState) {
		return new Response('State Mismatch', { status: 400 });
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`
			).toString('base64')}`
		},
		body: new URLSearchParams({
			code: code || '',
			redirect_uri: `${BASE_URL}/api/auth/callback`,
			grant_type: 'authorization_code',
			code_verifier: storedChallengeVerifier || '',
			client_id: SPOTIFY_APP_CLIENT_ID,
		})
	});

	const responseJSON = await response.json();

	console.log(responseJSON);

	return new Response(JSON.stringify(responseJSON), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
