import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
    appId: '2015996',
    key: '89b3bb8cda6c1d5914c5',
    secret: 'c3d101e2a7198422261d',
    cluster: 'ap2',
    useTLS: true,
});

export async function POST(req: Request) {
    try {
        // Parse form-encoded body
        const text = await req.text();
        const params = new URLSearchParams(text);
        const socket_id = params.get('socket_id');
        const channel_name = params.get('channel_name');

        console.log('[Pusher Auth] Request body:', { socket_id, channel_name });

        if (!socket_id || !channel_name) {
            console.error('[Pusher Auth] Missing parameters:', { socket_id, channel_name });
            return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
        }

        console.log('[Pusher Auth] Authenticating:', { socket_id, channel_name });
        const authResponse = pusher.authenticate(socket_id, channel_name);
        console.log('[Pusher Auth] Authentication successful:', authResponse);
        return NextResponse.json(authResponse);
    } catch (error) {
        console.error('[Pusher Auth] Error:', error, 'Stack:', (error as Error).stack);
        return NextResponse.json({ error: 'Failed to authenticate: ' + (error as Error).message }, { status: 500 });
    }
}