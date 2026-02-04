"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function YesPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Confetti explosion
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 flex flex-col items-center justify-center px-4 overflow-hidden">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1, delay: 0.2 }}
                className="text-center space-y-12"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-8xl md:text-9xl font-bold text-white drop-shadow-2xl"
                >
                    Yeah! 🎉
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring", duration: 1 }}
                    className="text-9xl"
                >
                    🌹
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-3xl md:text-4xl text-white font-semibold drop-shadow-lg"
                >
                    Happy Valentine's Day! 💕
                </motion.p>

                <motion.a
                    href="/letters"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-8 px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white text-xl font-semibold rounded-full hover:bg-white/30 transition-all hover:scale-105 shadow-xl"
                >
                    I have something more to tell you... 💌
                </motion.a>
            </motion.div>

            {/* Floating hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 0,
                            opacity: 0
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 4,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 3
                        }}
                        className="absolute text-4xl md:text-6xl"
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
