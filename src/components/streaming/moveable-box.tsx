"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Position {
    x: number;
    y: number;
}

interface MovableBoxProps {
    localCamera: React.RefObject<MediaStream | null>;
    className?: string;
}

export function MovableBox({ localCamera, className }: MovableBoxProps) {
    const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
    const [dragPosition, setDragPosition] = useState<Position>({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [lastCornerIndex, setLastCornerIndex] = useState<number>(0);
    const boxRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLElement | null>(null);
    const localCameraRef = useRef<HTMLVideoElement>(null);

    const boxWidth = 235;
    const boxHeight = 132;
    const margin = 20;

    useEffect(() => {
        if (localCameraRef.current && localCamera.current) {
            localCameraRef.current.srcObject = localCamera.current;
        }
    }, [localCamera.current]);

    const constrainPosition = useCallback((pos: Position, parentRect: DOMRect): Position => {
        return {
            x: Math.max(margin, Math.min(pos.x, parentRect.width - boxWidth - margin)),
            y: Math.max(margin, Math.min(pos.y, parentRect.height - boxHeight - margin)),
        };
    }, []);

    const getCornerPositions = useCallback(() => {
        const parent = boxRef.current?.parentElement;
        if (!parent || !boxRef.current) return [];

        const parentRect = parent.getBoundingClientRect();
        return [
            { x: margin, y: margin, label: "Top Left" },
            { x: parentRect.width - boxWidth - margin, y: margin, label: "Top Right" },
            { x: margin, y: parentRect.height - boxHeight - margin, label: "Bottom Left" },
            {
                x: parentRect.width - boxWidth - margin,
                y: parentRect.height - boxHeight - margin,
                label: "Bottom Right",
            },
        ];
    }, []);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            const rect = boxRef.current?.getBoundingClientRect();
            if (!rect) return;

            setIsDragging(true);
            setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setDragPosition(position);
            e.preventDefault();
            document.body.style.userSelect = "none";
        },
        [position]
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;

            const parent = boxRef.current?.parentElement;
            if (!parent) return;

            const parentRect = parent.getBoundingClientRect();
            const newX = e.clientX - dragStart.x - parentRect.left;
            const newY = e.clientY - dragStart.y - parentRect.top;

            const constrainedPos = constrainPosition({ x: newX, y: newY }, parentRect);
            setDragPosition(constrainedPos);
        },
        [isDragging, dragStart, constrainPosition]
    );

    const handleMouseUp = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;

            const parent = boxRef.current?.parentElement;
            if (!parent) return;

            const parentRect = parent.getBoundingClientRect();
            const mouseX = e.clientX - parentRect.left;
            const mouseY = e.clientY - parentRect.top;

            const corners = getCornerPositions();
            let closestCorner = corners[0];
            let closestIndex = 0;
            let minDistance = Number.POSITIVE_INFINITY;

            corners.forEach((corner, index) => {
                const distance = Math.sqrt(Math.pow(mouseX - corner.x, 2) + Math.pow(mouseY - corner.y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCorner = corner;
                    closestIndex = index;
                }
            });

            const constrainedPos = constrainPosition({ x: closestCorner.x, y: closestCorner.y }, parentRect);
            setPosition(constrainedPos);
            setDragPosition(constrainedPos);
            setLastCornerIndex(closestIndex);
            setIsDragging(false);
            document.body.style.userSelect = "";
        },
        [isDragging, getCornerPositions, constrainPosition]
    );

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    useEffect(() => {
        const parent = boxRef.current?.parentElement;
        if (!parent) return;

        parentRef.current = parent;

        const resizeObserver = new ResizeObserver(() => {
            const parentRect = parent.getBoundingClientRect();
            const corners = getCornerPositions();
            const targetCorner = corners[lastCornerIndex] || corners[0];
            const constrainedPos = constrainPosition({ x: targetCorner.x, y: targetCorner.y }, parentRect);
            setPosition(constrainedPos);
            setDragPosition(constrainedPos);
        });

        resizeObserver.observe(parent);
        return () => resizeObserver.disconnect();
    }, [position, constrainPosition, lastCornerIndex, getCornerPositions]);

    const currentPosition = isDragging ? dragPosition : position;

    return (
        <div className={`relative w-full h-full ${className}`}>
            <Card
                ref={boxRef}
                className={`absolute w-[235px] h-[132px] bg-black border-3 border-white/50 rounded-xl cursor-move select-none ${isDragging ? "shadow-2xl scale-105 z-20 rotate-3" : "shadow-lg hover:shadow-xl transition-all duration-200"
                    }`}
                style={{
                    left: `${currentPosition.x}px`,
                    top: `${currentPosition.y}px`,
                }}
                onMouseDown={handleMouseDown}
            >
                <div className="flex flex-col items-center justify-center h-full p-1 text-white">
                    <p>You</p>
                    <video ref={localCameraRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                </div>
            </Card>
        </div>
    );
}
