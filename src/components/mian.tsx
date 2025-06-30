import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Zap, Shield, Globe, ArrowRight, Star } from "lucide-react"

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
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

            {/* Hero Section */}
            <main className="relative">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/10 to-transparent rounded-full"></div>
                </div>

                <section className="relative z-10 px-4 py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
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

                                {/* Features List */}
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

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 group"
                                    >
                                        Start Streaming Now
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-400 bg-transparent"
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        Watch Demo
                                    </Button>
                                </div>

                                {/* Social Proof */}
                                <div className="flex items-center space-x-6 pt-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400 ml-2">4.9/5 from 10k+ users</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Visual */}
                            <div className="relative">
                                <div className="relative z-10">
                                    {/* Main Device Mockup */}
                                    <div className="relative mx-auto w-full max-w-md">
                                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
                                            {/* Mock Stream Interface */}
                                            <div className="space-y-4">
                                                {/* Header */}
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

                                                {/* Video Area */}
                                                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
                                                    <Play className="w-12 h-12 text-white/80" />

                                                    {/* Floating Elements */}
                                                    <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1">
                                                        <span className="text-white text-xs">1.2K viewers</span>
                                                    </div>

                                                    {/* Connection Indicators */}
                                                    <div className="absolute bottom-3 left-3 flex space-x-2">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                                                    </div>
                                                </div>

                                                {/* Stats */}
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

                                    {/* Floating Connection Nodes */}
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

                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
