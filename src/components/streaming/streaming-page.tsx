'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default function StreamingPage({ room }: { room: string }) {
    const roomId = room;
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [zp, setZp] = useState<any>(null);
    const [isInMeeting, setIsInMeeting] = useState(false);

    // Join the meeting
    const joinMeeting = async () => {
        const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
        if (!appID || !serverSecret) {
            throw new Error("Please provide AppID and Server Secret");
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Guest"
        );

        const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
        setZp(zegoInstance);

        zegoInstance.joinRoom({
            container: containerRef.current!,
            sharedLinks: [
                {
                    name: 'Join via this link',
                    url: `http://localhost:3000/room/${roomId}`
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

    // Cleanup
    useEffect(() => {
        if (containerRef.current) {
            joinMeeting();
        }

        return () => {
            if (zp) {
                zp.destroy();
            }
        };
    }, []);

    const endMeeting = () => {
        if (zp) {
            zp.destroy();
        }
        alert("Meeting ended successfully");
        setZp(null);
        setIsInMeeting(false);
        router.push("/");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <div
                className={`flex-grow flex flex-col md:flex-row relative ${isInMeeting ? "h-screen" : ""
                    }`}
            >
                <div
                    ref={containerRef}
                    className="video-container flex-grow"
                    style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
                ></div>
            </div>

            {!isInMeeting && (
                <div className="flex flex-col">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                            Meeting Info
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            Participant - You
                        </p>
                        <Button
                            onClick={endMeeting}
                            className="w-full bg-red-500 hover:bg-red-200 text-white hover:text-black"
                        >
                            End Meeting
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
                        <div className="text-center">
                            <Image
                                src="/images/videoQuality.jpg"
                                alt="Feature 1"
                                width={150}
                                height={150}
                                className="mx-auto mb-2 rounded-full"
                            />
                            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                                HD Video Quality
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Experience crystal clear video calls
                            </p>
                        </div>

                        <div className="text-center">
                            <Image
                                src="/images/screenShare.jpg"
                                alt="Feature 2"
                                width={150}
                                height={150}
                                className="mx-auto mb-2 rounded-full"
                            />
                            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                                Screen Sharing
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Easily share your screen with participants
                            </p>
                        </div>

                        <div className="text-center">
                            <Image
                                src="/images/videoSecure.jpg"
                                alt="Feature 3"
                                width={150}
                                height={150}
                                className="mx-auto mb-2 rounded-full"
                            />
                            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                                Secure Meetings
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Your meetings are protected and private
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
