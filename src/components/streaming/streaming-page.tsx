'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function StreamingPage({ room }: { room: string }) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [zp, setZp] = useState<any>(null);
    const [isInMeeting, setIsInMeeting] = useState(false);

    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

    const endMeeting = () => {
        if (zp) {
            zp.destroy();
        }
        alert("Meeting ended successfully");
        setZp(null);
        setIsInMeeting(false);
        router.push("/");
    };

    const joinMeeting = async () => {
        if (!containerRef.current) {
            console.warn("Container not ready");
            return;
        }

        if (!appID || !serverSecret) {
            throw new Error("ZEGO App ID or Server Secret is missing.");
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            room,
            Date.now().toString(),
            "Guest"
        );

        const instance = ZegoUIKitPrebuilt.create(kitToken);
        setZp(instance);

        instance.joinRoom({
            container: containerRef.current,
            sharedLinks: [
                {
                    name: 'Join via this link',
                    url: `http://localhost:3000/room/${room}`
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTurnOffRemoteCameraButton: true,
            showTurnOffRemoteMicrophoneButton: true,
            showRemoveUserButton: true,
            onJoinRoom: () => {
                alert('Meeting joined successfully');
                setIsInMeeting(true);
            },
            onLeaveRoom: () => {
                endMeeting();
            },
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            joinMeeting();
        }, 200); // wait briefly to ensure container is mounted

        return () => {
            clearTimeout(timeout);
            if (zp) {
                zp.destroy();
            }
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className={`flex-grow flex flex-col md:flex-row relative ${isInMeeting ? "h-screen" : ""}`}>
                <div
                    ref={containerRef}
                    className="video-container flex-grow"
                    style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
                />
            </div>

            {!isInMeeting && (
                <div className="flex flex-col">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Meeting Info</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">Participant - You</p>
                        <Button
                            onClick={endMeeting}
                            className="w-full bg-red-500 hover:bg-red-200 text-white hover:text-black"
                        >
                            End Meeting
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
                        {[
                            {
                                src: "/images/videoQuality.jpg",
                                title: "HD Video Quality",
                                desc: "Experience crystal clear video calls"
                            },
                            {
                                src: "/images/screenShare.jpg",
                                title: "Screen Sharing",
                                desc: "Easily share your screen with participants"
                            },
                            {
                                src: "/images/videoSecure.jpg",
                                title: "Secure Meetings",
                                desc: "Your meetings are protected and private"
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    width={150}
                                    height={150}
                                    className="mx-auto mb-2 rounded-full"
                                />
                                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
