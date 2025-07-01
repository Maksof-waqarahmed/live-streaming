"use client"

import { useEffect, useState } from "react"
import { ButtonBar } from "./button-bar"
import { Chat } from "./chat"
import { InvitePopup } from "./invite-popup"
import { MainArea } from "./main-area"

export default function StreamingPage() {
    const [showMeetingInfo, setShowMeetingInfo] = useState(true)
    const [showChat, setShowChat] = useState(false)
    const [screen, setScreen] = useState(null)
    const [camera, setCamera] = useState(null)
    const [isVideoOff, setIsVideoOff] = useState(true)
    const [isMuted, setIsMuted] = useState(true)

    const handleCloseInvitePopup = (data: boolean) => {
        setShowMeetingInfo(data);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    }

    return (
        <div className="min-h-screen bg-gray-800 relative">

            {showMeetingInfo && (
                <InvitePopup setShowMeetingInfo={handleCloseInvitePopup} />
            )}

            <MainArea screen={screen} camera={camera} showChat={showChat} isVideoOff={isVideoOff} isMuted={isMuted} />

            <ButtonBar showChat={showChat} setShowChat={toggleChat} shareScreen={setScreen} isVideoOff={isVideoOff} isMuted={isMuted} setIsVideoOff={setIsVideoOff} setIsMuted={setIsMuted} setCamera={setCamera} camera={camera} />

            {showChat && (
                <Chat setShowChat={setShowChat} />
            )}

        </div>
    )
}
