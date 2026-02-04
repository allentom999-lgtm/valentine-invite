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
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            >
                <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white animate-pulse px-4">
                        Scroll me
                    </h1>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-8 text-white/60 text-2xl"
                    >
                        ↓
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
