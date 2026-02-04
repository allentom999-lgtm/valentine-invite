export default function Projects() {
    const projects = [
        {
            title: "Immersive Commerce",
            client: "Nike",
            description: "3D product configurator with WebGL and React Three Fiber.",
            year: "2023"
        },
        {
            title: "Fintech Dashboard",
            client: "Stripe",
            description: "Real-time data visualization platform for high-frequency trading.",
            year: "2024"
        },
        {
            title: "AI Interface",
            client: "OpenAI",
            description: "Generative UI system for next-gen language models.",
            year: "2024"
        }
    ];

    return (
        <section className="relative w-full z-10 bg-[#121212] py-24 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tight">Selected Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-sm font-mono text-white/40">{project.year}</span>
                                        <span className="text-sm font-mono text-white/40">{project.client}</span>
                                    </div>
                                    <h3 className="text-3xl font-semibold text-white mb-4">{project.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                                    View Case Study <span className="ml-2">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
