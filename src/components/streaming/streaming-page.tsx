"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonBar } from "./button-bar";
import { Chat } from "./chat";
import { InvitePopup } from "./invite-popup";
import { MainArea } from "./main-area";
import { useWebRTC } from "@/hooks/useWebRTC";

export default function StreamingPage({ roomID }: { roomID: string }) {
    const [showMeetingInfo, setShowMeetingInfo] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [screen, setScreen] = useState<MediaStream | null>(null);
    const [camera, setCamera] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const activeStream = screen || camera;

    useWebRTC(roomID, activeStream, setRemoteStream);

    // Cleanup media streams on unmount
    useEffect(() => {
        return () => {
            camera?.getTracks().forEach(track => track.stop());
            screen?.getTracks().forEach(track => track.stop());
            console.log("[StreamingPage] Cleaned up media streams");
        };
    }, [camera, screen]);

    const handleCloseInvitePopup = (data: boolean) => {
        setShowMeetingInfo(data);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="min-h-screen bg-gray-800 relative">
            {showMeetingInfo && (
                <InvitePopup setShowMeetingInfo={handleCloseInvitePopup} />
            )}
            <MainArea
                screen={screen}
                camera={camera}
                remote={remoteStream}
                showChat={showChat}
                isVideoOff={isVideoOff}
                isMuted={isMuted}
            />
            <ButtonBar
                showChat={showChat}
                setShowChat={toggleChat}
                shareScreen={setScreen}
                isVideoOff={isVideoOff}
                isMuted={isMuted}
                setIsVideoOff={setIsVideoOff}
                setIsMuted={setIsMuted}
                setCamera={setCamera}
                camera={camera}
            />
            {showChat && <Chat setShowChat={setShowChat} />}
        </div>
    );
}