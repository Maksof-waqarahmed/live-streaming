"use client";

import { MicOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Badge } from "../ui/badge";

interface StreamingScreenProps {
    label: string;
    streamRef: React.RefObject<MediaStream | null>;
    isMuted: boolean;
    isLocal?: boolean;
}

export const StreamingScreen = ({ label, streamRef, isMuted, isLocal = false }: StreamingScreenProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
            console.log(`✅ ${label} stream attached`);
        }
    }, [streamRef.current]);

    return (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <div className={`w-full h-full ${isLocal ? "bg-gradient-to-br from-blue-900/50 to-purple-900/50" : "bg-gradient-to-br from-green-900/50 to-blue-900/50"} flex items-center justify-center`}>
                {streamRef.current ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted={isLocal} // local muted hoga
                        className="w-full h-full object-cover"
                        onLoadedMetadata={() => {
                            console.log(`🎥 ${label} video loaded`);
                        }}
                        onError={(e) => {
                            console.error(`❌ ${label} video error:`, e);
                        }}
                    />
                ) : (
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-white text-2xl font-semibold">{label === "You" ? "You" : "TG"}</span>
                        </div>
                        {!isLocal && (
                            <p className="text-white/80 text-lg">Waiting for participant...</p>
                        )}
                    </div>
                )}
            </div>

            <div className="absolute bottom-4 left-4">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">{label}</div>
            </div>

            {!isLocal && (
                <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                        {streamRef.current ? "P2P Connected" : "Waiting for Connection"}
                    </Badge>
                </div>
            )}

            {isMuted && isLocal && (
                <div className="absolute top-4 left-4">
                    <div className="bg-red-600 text-white p-2 rounded-full">
                        <MicOff className="h-4 w-4" />
                    </div>
                </div>
            )}
        </div>
    );
};
