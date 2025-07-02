'use client';

import { useEffect, useRef, useState } from 'react';
import { ButtonBar } from './button-bar';
import { Chat } from './chat';
import { InvitePopup } from './invite-popup';
import { MainArea } from './main-area';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useSearchParams } from 'next/navigation';

export default function StreamingPage({ room }: { room: string }) {
    const roomId = room;
    const [showMeetingInfo, setShowMeetingInfo] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
    const localCameraRef = useRef<MediaStream | null>(null);
    const localScreenRef = useRef<MediaStream | null>(null); // Separate ref for screen sharing
    const searchParams = useSearchParams();
    const isJoining = searchParams.get('join') === 'true'; // Fix: 'Sujet' -> 'true'
    const { localStream, remoteStream, peer, error } = useWebRTC({ roomId, isJoining });

    const handleCloseInvitePopup = (data: boolean) => {
        setShowMeetingInfo(data);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    useEffect(() => {
        localCameraRef.current = localStream;
    }, [localStream]);

    return (
        <div className="min-h-screen bg-gray-800 relative">
            {showMeetingInfo && <InvitePopup setShowMeetingInfo={handleCloseInvitePopup} />}
            <MainArea
                localCameraRef={localCameraRef}
                remoteStreamRef={{ current: remoteStream }}
                localStreamRef={localScreenRef} // Use separate ref for screen sharing
                isVideoOff={isVideoOff}
                isMuted={isMuted}
                showChat={showChat}
            />
            <ButtonBar
                setIsScreenSharing={setIsScreenSharing}
                showChat={showChat}
                setShowChat={toggleChat}
                setIsVideoOff={setIsVideoOff}
                setIsMuted={setIsMuted}
                isVideoOff={isVideoOff}
                isMuted={isMuted}
                cameraRef={localCameraRef}
                screenRef={localScreenRef} // Use separate ref
                roomId={roomId}
                peer={peer}
            />
            {showChat && <Chat setShowChat={setShowChat} />}
        </div>
    );
}