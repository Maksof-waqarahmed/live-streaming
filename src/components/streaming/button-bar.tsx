'use client'
import { MessageCircle, Mic, MicOff, Monitor, PhoneOff, Video, VideoOff } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect } from 'react';

interface ButtonBarProps {
    showChat: boolean;
    setShowChat: (value: boolean) => void;
    shareScreen: (data: any) => void;
    isMuted: boolean;
    setIsMuted: (value: boolean) => void;
    isVideoOff: boolean;
    setIsVideoOff: (value: boolean) => void;
    setCamera: (value: any) => void;
    camera: MediaStream | null;
}

export const ButtonBar = ({ showChat, setShowChat, shareScreen, isMuted, setIsMuted, isVideoOff, setIsVideoOff, setCamera, camera }: ButtonBarProps) => {

    const handleVideoToggle = async () => {
        if (!isVideoOff) {
            camera?.getTracks().forEach(track => track.stop());
            setCamera(null);
            setIsVideoOff(true);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setCamera(stream);
                setIsVideoOff(false);
            } catch (error) {
                console.error("Error accessing user media:", error);
                alert("Failed to access camera. Please ensure camera permissions are granted.");
            }
        }
    };

    const handleScreenSharing = async () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                const screen = await navigator.mediaDevices.getDisplayMedia({
                    audio: true,
                    video: true,
                });
                shareScreen(screen);
                screen.getTracks().forEach(track => {
                    track.onended = () => {
                        shareScreen(null);
                        console.log("[ScreenShare] Screen sharing stopped");
                    };
                });
            } else {
                console.error("Screen sharing not supported.");
                alert("Your browser does not support screen sharing.");
            }
        } catch (error) {
            console.error("Error accessing display media:", error);
            alert("Failed to start screen sharing. Please ensure permissions are granted.");
        }
    };




    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <span className="text-white text-sm">1:06 PM</span>
                        <span className="text-gray-400 text-sm">|</span>
                        <span className="text-white text-sm">abc-defg-hij</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="lg"
                            className={`rounded-full w-12 h-12 ${isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            className={`rounded-full w-12 h-12 ${isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                            onClick={handleVideoToggle}
                        >
                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white"
                            onClick={handleScreenSharing}
                        >
                            <Monitor className="h-5 w-5" />
                        </Button>
                        {/* <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-full w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white"
                        >
                            <MoreVertical className="h-5 w-5" />
                        </Button> */}

                        <Button
                            variant="ghost"
                            size="lg"
                            className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700 text-white ml-4"
                        >
                            <PhoneOff className="h-5 w-5" />
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            size="lg"
                            className={`rounded-full w-12 h-12 ${showChat ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                            onClick={() => setShowChat(!showChat)}
                        >
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}