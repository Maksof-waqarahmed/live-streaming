import { Play } from 'lucide-react'
import React from 'react'

export const Header = () => {
    return (
        <>
            <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="ml-2 text-xl font-bold text-white">StreamP2P</span>
                </div>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Pricing
                    </a>
                    <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        About
                    </a>
                </nav>
            </header>
        </>
    )
}