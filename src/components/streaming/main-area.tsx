"use client";

import React from "react";
import { MovableBox } from "./moveable-box";
import { StreamingScreen } from "./user-streaming-screen";

interface MainAreaProps {
    localStreamRef: React.RefObject<MediaStream | null>;
    remoteStreamRef: React.RefObject<MediaStream | null>;
    localCameraRef: React.RefObject<MediaStream | null>;
    isVideoOff: boolean;
    isMuted: boolean;
    showChat: boolean;
}

export const MainArea = ({
    isMuted,
    isVideoOff,
    showChat,
    localCameraRef,
    localStreamRef,
    remoteStreamRef,
}: MainAreaProps) => {
    return (
        <div className={`flex ${showChat ? "mr-96" : ""} transition-all duration-300 relative`}>
            <div className="flex-1 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
                    {/* Local Stream */}
                    <StreamingScreen
                        label="You"
                        streamRef={localStreamRef}
                        isMuted={isMuted}
                        isLocal={true}
                    />

                    {/* Remote Stream */}
                    <StreamingScreen
                        label="Participant"
                        streamRef={remoteStreamRef}
                        isMuted={false}
                        isLocal={false}
                    />
                </div>
            </div>

            {!isVideoOff && (
                <div className="absolute inset-0 z-20">
                    <MovableBox localCamera={localCameraRef} />
                </div>
            )}
        </div>
    );
};
