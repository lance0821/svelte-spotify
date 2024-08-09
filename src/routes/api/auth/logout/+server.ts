import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = ({cookies})=> {
	cookies.delete('refresh_token', {path: '/'});
	cookies.delete('access_token', {path: '/'});
	throw redirect(303, '/login');
}
