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
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState<Boolean>(false);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const localCameraRef = useRef<MediaStream | null>(null);
    const remoteCameraRef = useRef<MediaStream | null>(null);
    console.log("localStreamRef", localStreamRef.current);

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
                localCameraRef={localCameraRef}
                remoteStreamRef={remoteStreamRef}
                localStreamRef={localStreamRef}
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
                screenRef={localStreamRef}
            />
            {showChat && <Chat setShowChat={setShowChat} />}
        </div>
    );
}