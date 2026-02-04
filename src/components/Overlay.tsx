"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Fade out "Scroll me" text and vignette as user scrolls (0% - 10%)
    const initialOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const vignetteOpacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 0]);

    return (
        <>
            {/* Vignette overlay that fades out on scroll */}
            <motion.div
                style={{
                    opacity: vignetteOpacity,
                    background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%)'
                }}
                className="absolute inset-0 z-5 pointer-events-none"
            />

            {/* Initial "Scroll me" text */}
            <motion.div
                style={{ opacity: initialOpacity }}
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center px-4"
            >
                <div className="text-center">
                    <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white animate-pulse">
                        Scroll me
                    </h1>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-4 md:mt-8 text-white/60 text-xl md:text-2xl"
                    >
                        ↓
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        onClick={() => {
                            window.scrollTo({
                                top: window.innerHeight * 4,
                                behavior: 'smooth'
                            });
                        }}
                        className="mt-8 md:mt-12 px-6 md:px-8 py-2 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm md:text-lg font-medium hover:bg-white/20 transition-all pointer-events-auto"
                    >
                        Auto Play ✨
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}
