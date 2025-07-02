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
    const body = await req.json();
    console.log('[Pusher API] Request body:', body);
    const { roomId, signalData } = body;
    if (!roomId || !signalData) {
      console.error('[Pusher API] Missing parameters:', { roomId, signalData });
      return NextResponse.json({ error: 'Missing roomId or signalData' }, { status: 400 });
    }

    // Trim SDP to essential fields to reduce size
    const trimmedSignalData = {
      type: signalData.type,
      sdp: signalData.sdp?.substring(0, 8000), // Limit SDP to 8KB to stay under 10KB
    };
    console.log('[Pusher API] Trimmed signal data size:', JSON.stringify(trimmedSignalData).length);

    console.log('[Pusher API] Triggering signal event for room:', roomId);
    await pusher.trigger(`private-room-${roomId}`, 'signal', { signalData: trimmedSignalData });
    console.log('[Pusher API] Signal event triggered successfully');
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('[Pusher API] Error:', error, 'Stack:', (error as Error).stack);
    return NextResponse.json({ error: 'Failed to trigger Pusher event: ' + (error as Error).message }, { status: 500 });
  }
}