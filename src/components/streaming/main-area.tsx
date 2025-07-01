"use client";

import { MicOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Badge } from "../ui/badge";
import { MovableBox } from "./moveable-box";

interface MainAreaProps {
    screen: MediaStream | null;
    camera: MediaStream | null;
    remote: MediaStream | null;
    isVideoOff: boolean;
    isMuted: boolean;
    showChat: boolean;
}

export const MainArea = ({ screen, isVideoOff, isMuted, showChat, camera, remote }: MainAreaProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (screen && videoRef.current) {
            videoRef.current.srcObject = screen;
        } else if (camera && videoRef.current) {
            videoRef.current.srcObject = camera;
        }
    }, [screen, camera]);

    useEffect(() => {
        if (remoteVideoRef.current && remote) {
            console.log("✅ Setting remote video stream");
            remoteVideoRef.current.srcObject = remote;
        } else {
            console.log("⏳ Waiting for remote stream or ref", {
                ref: remoteVideoRef.current,
                stream: remote,
            });
        }
    }, [remote]);


    return (
        <div className={`flex ${showChat ? "mr-96" : ""} transition-all duration-300 relative`}>
            <div className="flex-1 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
                    {/* Local Video */}
                    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                            {screen || camera ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted={true}
                                    className="w-full h-full object-cover"
                                    onLoadedMetadata={() => {
                                        console.log("✅ Local video loaded in <video>", videoRef.current?.srcObject);
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                            <span className="text-white text-2xl font-semibold">You</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">You</div>
                        </div>
                        {isMuted && (
                            <div className="absolute top-4 left-4">
                                <div className="bg-red-600 text-white p-2 rounded-full">
                                    <MicOff className="h-4 w-4" />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Remote Video */}
                    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-green-900/50 to-blue-900/50 flex items-center justify-center">
                            {remote ? (
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    muted={false}
                                    className="w-full h-full object-cover"
                                    onLoadedMetadata={() => {
                                        console.log("✅ Remote video loaded in <video>", remoteVideoRef.current?.srcObject);
                                    }}
                                    onError={(e) => {
                                        console.error("❌ Remote video error:", e);
                                    }}
                                />
                            ) : (
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <span className="text-white text-2xl font-semibold">TG</span>
                                    </div>
                                    <p className="text-white/80 text-lg">Waiting for participant...</p>
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">Participant</div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                                {remote ? "P2P Connected" : "Waiting for Connection"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
            {!isVideoOff && (
                <div className="absolute inset-0 z-20">
                    <MovableBox camera={camera} />
                </div>
            )}
        </div>
    );
};