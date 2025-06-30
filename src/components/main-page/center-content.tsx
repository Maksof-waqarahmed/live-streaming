import React from 'react'
import { Badge } from '../ui/badge'
import { ArrowRight, Globe, Play, Shield, Star, Users, Zap } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export const LeftComponent = () => {
    return (
        <>
            <div className="space-y-8">
                <div className="space-y-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Next-Gen P2P Technology
                    </Badge>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Stream{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Directly
                        </span>
                        <br />
                        Connect{" "}
                        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Instantly
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                        Experience ultra-low latency live streaming with our revolutionary P2P technology. Connect directly
                        with your audience without traditional servers.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">Direct P2P Connection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">Ultra-Low Latency</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">Global Network</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href='/stream/1' className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 group"
                        >
                            Start Streaming Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-400 bg-transparent"
                    >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Demo
                    </Button>
                </div>
            </div>
        </>
    )
}

export const RightComponent = () => {
    return (
        <>
            <div className="relative">
                <div className="relative z-10">
                    <div className="relative mx-auto w-full max-w-md">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                        <div>
                                            <div className="text-white text-sm font-medium">Live Stream</div>
                                            <div className="text-gray-400 text-xs">P2P Connection</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-red-400 text-xs font-medium">LIVE</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
                                    <Play className="w-12 h-12 text-white/80" />
                                    <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1">
                                        <span className="text-white text-xs">1.2K viewers</span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 flex space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                        <div className="text-purple-400 text-lg font-bold">{"<1ms"}</div>
                                        <div className="text-gray-400 text-xs">Latency</div>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                        <div className="text-green-400 text-lg font-bold">4K</div>
                                        <div className="text-gray-400 text-xs">Quality</div>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                        <div className="text-blue-400 text-lg font-bold">P2P</div>
                                        <div className="text-gray-400 text-xs">Direct</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center justify-center animate-bounce">
                        <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-500/20 rounded-full border border-pink-500/30 flex items-center justify-center animate-bounce delay-500">
                        <Zap className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="absolute top-1/2 -right-8 w-10 h-10 bg-blue-500/20 rounded-full border border-blue-500/30 flex items-center justify-center animate-bounce delay-1000">
                        <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
        </>
    )
}