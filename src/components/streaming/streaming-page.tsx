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

    const handleCloseInvitePopup = (data: boolean) => {
        setShowMeetingInfo(data);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    }

    useEffect(() => {
        
    }, [screen])

    return (
        <div className="min-h-screen bg-gray-800 relative">

            {showMeetingInfo && (
                <InvitePopup setShowMeetingInfo={handleCloseInvitePopup} />
            )}

            <MainArea screen={screen} />

            <ButtonBar showChat={showChat} setShowChat={toggleChat} shareScreen={setScreen} />

            {showChat && (
                <Chat setShowChat={setShowChat} />
            )}

        </div>
    )
}
