'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { MessageCircle, Send, Smile, X } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'

const chatMessages = [
    { id: 1, user: "StreamFan23", message: "Amazing quality! 🔥", time: "2m ago", isVip: false },
    { id: 2, user: "TechGuru", message: "P2P connection is so smooth", time: "3m ago", isVip: true },
    { id: 3, user: "LiveViewer", message: "How is the latency so low?", time: "4m ago", isVip: false },
    { id: 4, user: "StreamQueen", message: "Best streaming platform ever!", time: "5m ago", isVip: true },
    { id: 5, user: "P2PFan", message: "Direct connection FTW! 💪", time: "6m ago", isVip: false },
]
interface ChatProps {
    setShowChat: (value: boolean) => void
}
export const Chat = ({setShowChat}: ChatProps) => {
    const [chatMessage, setChatMessage] = useState("")
    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            setChatMessage("")
        }
    }
    return (
        <>
            <div className="fixed right-0 top-0 bottom-0 w-96 bg-white border-l border-gray-200 z-40">
                <Card className="h-full bg-white border-0 rounded-none">
                    <CardContent className="p-0 h-full flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-gray-900 font-semibold flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    In-call messages
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowChat(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-3">
                                {chatMessages.map((msg) => (
                                    <div key={msg.id} className="flex items-start space-x-2">
                                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <span className={`font-medium text-sm ${msg.isVip ? "text-yellow-600" : "text-gray-900"}`}>
                                                    {msg.user}
                                                </span>
                                                {msg.isVip && (
                                                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs px-1 py-0">
                                                        VIP
                                                    </Badge>
                                                )}
                                                <span className="text-gray-500 text-xs">{msg.time}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm mt-1">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <Input
                                    placeholder="Send a message to everyone"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                />
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                                    <Smile className="h-4 w-4" />
                                </Button>
                                <div className="flex space-x-1">
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                                        ❤️
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                                        🔥
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                                        👏
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}