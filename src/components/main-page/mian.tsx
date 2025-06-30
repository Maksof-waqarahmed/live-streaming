import { LeftComponent, RightComponent } from "./center-content"
import { Header } from "./header"

export default function MainPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />
            <main className="relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/10 to-transparent rounded-full"></div>
                </div>

                <section className="relative z-10 px-4 py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <LeftComponent />

                            <RightComponent />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
