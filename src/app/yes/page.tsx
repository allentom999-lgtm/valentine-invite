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
        <div className="min-h-screen bg-[#0a060e] flex flex-col items-center justify-center px-4 overflow-hidden font-poppins text-white">
            {/* Animated breathing background - Magenta/Rose focus */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 80% 50%, rgba(219, 39, 119, 0.45) 0%, rgba(162, 28, 175, 0.25) 35%, transparent 70%)',
                        'radial-gradient(circle at 90% 40%, rgba(162, 28, 175, 0.45) 0%, rgba(219, 39, 119, 0.25) 35%, transparent 70%)',
                        'radial-gradient(circle at 70% 60%, rgba(219, 39, 119, 0.45) 0%, rgba(162, 28, 175, 0.25) 35%, transparent 70%)',
                        'radial-gradient(circle at 80% 50%, rgba(219, 39, 119, 0.45) 0%, rgba(162, 28, 175, 0.25) 35%, transparent 70%)',
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 opacity-100"
            />

            {/* Secondary breathing layer - Cyan/Teal accent from the photos */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 40%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
                        'radial-gradient(circle at 10% 30%, rgba(8, 145, 178, 0.35) 0%, transparent 60%)',
                        'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
                        'radial-gradient(circle at 20% 40%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
                    ],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute inset-0 opacity-80"
            />

            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1, delay: 0.2 }}
                className="text-center space-y-12 relative z-10"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-8xl md:text-9xl font-bold drop-shadow-2xl"
                >
                    Yeah! 🎉
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 10 }}
                    className="text-9xl animate-sway inline-block"
                >
                    🌹
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-3xl md:text-4xl font-semibold drop-shadow-lg"
                >
                    Happy Valentine's Day! 💕
                </motion.p>

                <motion.a
                    href="/letters"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-8 px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white text-xl font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-pulse-glow"
                >
                    I have something more to tell you... 💌
                </motion.a>
            </motion.div>

            {/* Floating hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
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
                            duration: Math.random() * 5 + 8,
                            delay: Math.random() * 8,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2
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
