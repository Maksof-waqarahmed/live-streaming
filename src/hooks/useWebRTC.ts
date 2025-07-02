'use client';

import Pusher, { Channel } from 'pusher-js';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

interface UseWebRTCProps {
    roomId: string;
    isJoining: boolean;
}

interface WebRTCState {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    peer: SimplePeer.Instance | null;
    error: string | null;
}

export const useWebRTC = ({ roomId, isJoining }: UseWebRTCProps): WebRTCState => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pusherRef = useRef<Pusher | null>(null);
    const channelRef = useRef<Channel | null>(null);
    const router = useRouter();

    useEffect(() => {
        console.log('[WebRTC] Initializing for room:', roomId, 'isJoining:', isJoining);

        // Initialize Pusher
        pusherRef.current = new Pusher('89b3bb8cda6c1d5914c5', {
            cluster: 'ap2',
            forceTLS: true,
            authEndpoint: '/api/pusher-auth',
        });
        console.log('[WebRTC] Pusher initialized, subscribing to private-room-', roomId);
        channelRef.current = pusherRef.current.subscribe(`private-room-${roomId}`);

        // Handle Pusher connection state
        pusherRef.current.connection.bind('state_change', ({ current }: { current: string }) => {
            console.log('[Pusher] Connection state:', current);
        });

        // Handle Pusher errors
        pusherRef.current.connection.bind('error', (err: any) => {
            setError('Pusher connection error: ' + (err.error?.data?.message || err.message));
            console.error('[Pusher] Error:', err, 'Code:', err.error?.data?.code);
        });

        // Get local stream
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                console.log('[WebRTC] Local stream acquired');
                setLocalStream(stream);

                // Initialize SimplePeer
                const p = new SimplePeer({
                    initiator: !isJoining,
                    trickle: false,
                    stream,
                    config: {
                        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
                    },
                });

                // Handle signaling
                p.on('signal', async (data) => {
                    console.log('[WebRTC] Sending signal data for room:', roomId, 'Data size:', JSON.stringify(data).length);
                    try {
                        const response = await fetch('/api/pusher', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ roomId, signalData: data }),
                        });
                        if (!response.ok) {
                            const errorText = await response.text();
                            throw new Error(`Failed to send signaling data: ${response.status} ${errorText}`);
                        }
                        console.log('[WebRTC] Signal data sent successfully');
                    } catch (err) {
                        setError('Failed to send signaling data');
                        console.error('[WebRTC] Signaling error:', err);
                    }
                });

                // Handle remote stream
                p.on('stream', (remote) => {
                    console.log('[WebRTC] Remote stream received');
                    setRemoteStream(remote);
                });

                // Handle errors
                p.on('error', (err) => {
                    setError('WebRTC connection error');
                    console.error('[WebRTC] Peer error:', err);
                });

                setPeer(p);
                console.log('[WebRTC] SimplePeer initialized');

                // Receive signaling data
                channelRef.current.bind('signal', ({ signalData }) => {
                    console.log('[WebRTC] Received signal data:', signalData);
                    p.signal(signalData);
                });
            })
            .catch((err) => {
                setError('Failed to access media devices');
                console.error('[WebRTC] Media error:', err);
            });

        // Cleanup
        return () => {
            console.log('[WebRTC] Cleaning up for room:', roomId);
            peer?.destroy();
            pusherRef.current?.unsubscribe(`private-room-${roomId}`);
            localStream?.getTracks().forEach((track) => track.stop());
        };
    }, [roomId, isJoining]);

    return { localStream, remoteStream, peer, error };
};