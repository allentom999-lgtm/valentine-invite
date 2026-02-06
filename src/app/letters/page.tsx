"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ValentineDay {
    date: string;
    name: string;
    emoji: string;
    color: string;
    isSpecial?: boolean;
}

const valentineDays: ValentineDay[] = [
    { date: "2026-02-07", name: "Rose Day", emoji: "🌹", color: "from-red-400 to-pink-500" },
    { date: "2026-02-08", name: "Propose Day", emoji: "💍", color: "from-purple-400 to-pink-400" },
    { date: "2026-02-09", name: "Chocolate Day", emoji: "🍫", color: "from-amber-600 to-yellow-500" },
    { date: "2026-02-10", name: "Teddy Day", emoji: "🧸", color: "from-orange-400 to-red-400" },
    { date: "2026-02-11", name: "Promise Day", emoji: "🤝", color: "from-blue-400 to-purple-400" },
    { date: "2026-02-12", name: "Hug Day", emoji: "🤗", color: "from-green-400 to-teal-400" },
    { date: "2026-02-13", name: "Kiss Day", emoji: "💋", color: "from-pink-500 to-rose-500" },
    { date: "2026-02-14", name: "Valentine's Day", emoji: "💖", color: "from-rose-500 to-pink-600", isSpecial: true },
];

export default function LettersPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const isUnlocked = (targetDate: string) => {
        const target = new Date(targetDate);
        target.setHours(6, 0, 0, 0);
        return currentTime >= target;
    };

    const getTimeRemaining = (targetDate: string) => {
        const target = new Date(targetDate);
        target.setHours(6, 0, 0, 0);
        const diff = target.getTime() - currentTime.getTime();

        if (diff <= 0) return "Unlocked! 🎉";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-4">
                        Valentine's Week 💕
                    </h1>
                    <p className="text-xl md:text-2xl text-rose-600 font-medium">
                        A letter for each special day...
                    </p>
                </motion.div>

                {/* Envelopes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {valentineDays.slice(0, 7).map((day, index) => {
                        const unlocked = isUnlocked(day.date);
                        const timeRemaining = getTimeRemaining(day.date);

                        return (
                            <motion.div
                                key={day.date}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className={`relative group ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                                    {/* Timer */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-10">
                                        <p className={`text-sm font-mono font-bold ${unlocked ? 'text-green-600' : 'text-rose-600'}`}>
                                            {timeRemaining}
                                        </p>
                                    </div>

                                    {/* Envelope */}
                                    <Link href={unlocked ? `/letter/${day.date}` : "#"} className="block">
                                        <motion.div
                                            whileHover={unlocked ? { scale: 1.05, rotate: 2 } : {}}
                                            className={`relative bg-gradient-to-br ${day.color} p-8 rounded-3xl shadow-2xl min-h-[280px] flex flex-col items-center justify-center ${!unlocked && 'opacity-50 grayscale'
                                                }`}
                                        >
                                            {/* Lock Icon */}
                                            {!unlocked && (
                                                <div className="absolute top-4 right-4 text-4xl">
                                                    🔒
                                                </div>
                                            )}

                                            {/* Envelope Icon */}
                                            <div className="text-7xl mb-4">
                                                {unlocked ? '💌' : '✉️'}
                                            </div>

                                            {/* Day Info */}
                                            <h3 className="text-2xl font-bold text-white text-center mb-2">
                                                {day.name}
                                            </h3>
                                            <p className="text-xl">
                                                {day.emoji}
                                            </p>

                                            {unlocked && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-4 text-white/90 font-medium"
                                                >
                                                    Click to open
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Valentine's Day Envelope - Centered and Special */}
                {(() => {
                    const day = valentineDays[7]; // Valentine's Day
                    const unlocked = isUnlocked(day.date);
                    const timeRemaining = getTimeRemaining(day.date);

                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex justify-center"
                        >
                            <div className={`relative group ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'} max-w-2xl w-full`}>
                                {/* Timer */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-10">
                                    <p className={`text-sm font-mono font-bold ${unlocked ? 'text-green-600' : 'text-rose-600'}`}>
                                        {timeRemaining}
                                    </p>
                                </div>

                                {/* Envelope */}
                                <Link href={unlocked ? `/letter/${day.date}` : "#"} className="block">
                                    <motion.div
                                        whileHover={unlocked ? { scale: 1.05, rotate: 2 } : {}}
                                        className={`relative bg-gradient-to-br ${day.color} p-12 rounded-3xl shadow-2xl min-h-[400px] flex flex-col items-center justify-center ${!unlocked && 'opacity-50 grayscale'
                                            }`}
                                    >
                                        {/* Lock Icon */}
                                        {!unlocked && (
                                            <div className="absolute top-4 right-4 text-5xl">
                                                🔒
                                            </div>
                                        )}

                                        {/* Envelope Icon */}
                                        <div className="text-9xl mb-6">
                                            {unlocked ? '💌' : '✉️'}
                                        </div>

                                        {/* Day Info */}
                                        <h3 className="text-5xl font-bold text-white text-center mb-4">
                                            {day.name}
                                        </h3>
                                        <p className="text-4xl">
                                            {day.emoji}
                                        </p>

                                        {unlocked && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-6 text-white/90 font-medium text-xl"
                                            >
                                                Click to open
                                            </motion.p>
                                        )}
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    );
                })()}

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/yes"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-xl hover:scale-105"
                    >
                        ← Back to Celebration
                    </Link>
                    <div className="mt-4">
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 border-2 border-rose-500 text-rose-600 text-lg font-semibold rounded-full hover:bg-rose-50 transition-all shadow-md hover:scale-105"
                        >
                            🏠 Return to Main Page
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Hearts Background */}
            {mounted && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: window.innerHeight + 100,
                                opacity: 0,
                            }}
                            animate={{
                                y: -100,
                                opacity: [0, 0.3, 0.3, 0],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 8,
                                delay: Math.random() * 3,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 5,
                            }}
                            className="absolute text-3xl md:text-5xl"
                        >
                            {['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
