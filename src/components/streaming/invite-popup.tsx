import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Copy, Users, X } from 'lucide-react'

interface InvitePopupProps {
    setShowMeetingInfo: (show: boolean) => void;
}
export const InvitePopup = ({ setShowMeetingInfo }: InvitePopupProps) => {
    const copyMeetingLink = () => {
        navigator.clipboard.writeText("meet.streamp2p.com/abc-defg-hij")
    }
    return (
        <>
            <div className="absolute top-6 left-6 z-50">
                <Card className="bg-white border-0 shadow-lg w-80">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-900 font-medium">Your meeting's ready</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowMeetingInfo(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white">
                            <Users className="h-4 w-4 mr-2" />
                            Add others
                        </Button>

                        <p className="text-sm text-gray-600 mb-3">
                            Or share this meeting link with others you want in the meeting
                        </p>

                        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-700 flex-1">meet.streamp2p.com/abc-defg-hij</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyMeetingLink}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-start space-x-2 mt-4 p-3 bg-blue-50 rounded-lg">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs">i</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    People who use this meeting link must get your permission before they can join.
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Joined as waqasahmed786123@gmail.com</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
