"use client";

import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";

export function useWebRTC(
    roomID: string,
    localStream: MediaStream | null,
    onRemoteStream: (stream: MediaStream) => void
) {
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const pusherRef = useRef<Pusher | null>(null);
    const channelRef = useRef<any>(null);

    useEffect(() => {
        if (!localStream) {
            console.log("[WebRTC] No local stream, skipping peer connection setup");
            return;
        }

        console.log("[WebRTC] Initializing peer connection...");

        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                {
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
                {
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
            ],
        });
        peerConnectionRef.current = peer;

        peer.onconnectionstatechange = () => {
            console.log("[WebRTC] Connection state:", peer.connectionState);
            if (peer.connectionState === "failed") {
                console.error("[WebRTC] Connection failed, restarting ICE...");
                peer.restartIce();
                alert("WebRTC connection failed. Please check your network and try again.");
            } else if (peer.connectionState === "disconnected") {
                alert("WebRTC connection disconnected. Attempting to reconnect...");
            }
        };

        localStream.getTracks().forEach((track) => {
            console.log("[WebRTC] Adding local track:", track.kind);
            peer.addTrack(track, localStream);
        });

        const remoteStream = new MediaStream();
        peer.ontrack = (event) => {
            console.log("[WebRTC] 🔔 Track received:", event.track.kind);
            event.streams[0].getTracks().forEach((track) => {
                console.log("[WebRTC] ➕ Track added to remoteStream:", track.kind);
                remoteStream.addTrack(track);
            });
            onRemoteStream(remoteStream);
            console.log("[WebRTC] ✅ Remote video loaded");
        };

        const pusher = new Pusher("89b3bb8cda6c1d5914c5", {
            cluster: "ap2",
            authEndpoint: "http://192.168.1.49:3000/api/pusher-auth",
            auth: {},
            forceTLS: false, // Use http for local network
            enabledTransports: ["ws"], // Force WebSocket
        });
        pusherRef.current = pusher;

        pusher.connection.bind("error", (err: any) => {
            console.error("[Pusher] Connection error:", err);
            alert("Failed to connect to signaling server. Please try again.");
        });

        pusher.connection.bind("connected", () => {
            console.log("[Pusher] Connected to Pusher");
        });

        const channel = pusher.subscribe(`private-${roomID}`);
        channelRef.current = channel;
        console.log("[WebRTC] Subscribed to private room:", `private-${roomID}`);

        channel.bind("pusher:subscription_error", (err: any) => {
            console.error("[Pusher] Subscription error:", err);
            alert("Failed to subscribe to Pusher channel. Please check authentication.");
        });

        channel.bind("pusher:subscription_succeeded", () => {
            console.log("[Pusher] Subscription succeeded for room:", `private-${roomID}`);
        });

        channel.bind("pusher:member_added", (member: any) => {
            console.log("[Pusher] Member added:", member);
        });

        channel.bind("pusher:member_removed", (member: any) => {
            console.log("[Pusher] Member removed:", member);
        });

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("[WebRTC] Sending ICE candidate:", event.candidate);
                channel.trigger("client-ice", { candidate: event.candidate });
            } else {
                console.log("[WebRTC] ICE gathering complete");
            }
        };

        channel.bind("client-offer", async ({ offer }) => {
            console.log("[WebRTC] 📥 Received offer:", offer);
            try {
                await peer.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                channel.trigger("client-answer", { answer });
                console.log("[WebRTC] 🔼 Answer sent:", answer);
            } catch (error) {
                console.error("[WebRTC] Error handling offer:", error);
                alert("Failed to process WebRTC offer. Please try again.");
            }
        });

        channel.bind("client-answer", async ({ answer }) => {
            console.log("[WebRTC] 📥 Received answer:", answer);
            try {
                await peer.setRemoteDescription(new RTCSessionDescription(answer));
            } catch (error) {
                console.error("[WebRTC] Error handling answer:", error);
                alert("Failed to process WebRTC answer. Please try again.");
            }
        });

        channel.bind("client-ice", async ({ candidate }) => {
            if (candidate) {
                console.log("[WebRTC] 📥 ICE candidate received:", candidate);
                try {
                    await peer.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (error) {
                    console.error("[WebRTC] Error adding ICE candidate:", error);
                }
            }
        });

        (async () => {
            console.log("[WebRTC] Current URL:", window.location.href);
            console.log("[WebRTC] Current hash:", window.location.hash);
            const isCaller = window.location.hash === "#caller";
            console.log("[WebRTC] isCaller:", isCaller);

            if (isCaller) {
                console.log("[WebRTC] 🟢 Acting as caller");
                channel.bind("pusher:subscription_succeeded", async () => {
                    console.log("[Pusher] Subscription succeeded for caller, sending offer...");
                    try {
                        const offer = await peer.createOffer();
                        await peer.setLocalDescription(offer);
                        channel.trigger("client-offer", { offer });
                        console.log("[WebRTC] 🔼 Offer sent:", offer);
                    } catch (error) {
                        console.error("[WebRTC] Error creating offer:", error);
                        alert("Failed to create WebRTC offer. Please try again.");
                    }
                });
            } else {
                console.log("[WebRTC] 🟡 Waiting for offer...");
            }
        })();

        return () => {
            console.log("[WebRTC] Cleaning up peer connection and Pusher subscription");
            peer.close();
            if (pusherRef.current) pusherRef.current.unsubscribe(`private-${roomID}`);
        };
    }, [localStream, roomID, onRemoteStream]);
}