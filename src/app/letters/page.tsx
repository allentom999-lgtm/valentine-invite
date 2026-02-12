"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    const [showQuestion, setShowQuestion] = useState(false);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);
    const [challengeDay, setChallengeDay] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedAnswer = answer.trim().toLowerCase();

        let isCorrect = false;
        if (challengeDay === "Rose Day" && answer.trim() === "15/02/2025") {
            isCorrect = true;
        } else if (challengeDay === "Propose Day" && normalizedAnswer === "mango") {
            isCorrect = true;
        } else if (challengeDay === "Chocolate Day" && normalizedAnswer === "apna bana le") {
            isCorrect = true;
        } else if (challengeDay === "Teddy Day" && normalizedAnswer === "allen") {
            isCorrect = true;
        } else if (challengeDay === "Promise Day" && normalizedAnswer === "ammu") {
            isCorrect = true;
        } else if (challengeDay === "Hug Day" && normalizedAnswer === "ammu") {
            isCorrect = true;
        }

        if (isCorrect) {
            setShowQuestion(false);
            setError(false);
            setAnswer("");
            const targetDay = valentineDays.find(d => d.name === challengeDay);
            if (targetDay) {
                router.push(`/letter/${targetDay.date}`);
            }
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

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
        <div className="relative min-h-screen bg-[#0a060e] flex flex-col items-center justify-start px-4 py-24 overflow-x-hidden font-poppins text-white cursor-heart">
            {/* Animated breathing background - Magenta/Rose focus */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.3) 0%, rgba(162, 28, 175, 0.15) 35%, transparent 70%)',
                        'radial-gradient(circle at 20% 10%, rgba(162, 28, 175, 0.3) 0%, rgba(219, 39, 119, 0.15) 35%, transparent 70%)',
                        'radial-gradient(circle at 5% 30%, rgba(219, 39, 119, 0.3) 0%, rgba(162, 28, 175, 0.15) 35%, transparent 70%)',
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.3) 0%, rgba(162, 28, 175, 0.15) 35%, transparent 70%)',
                    ],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="fixed inset-0 opacity-100"
            />

            {/* Cyan Accent */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 60%)',
                        'radial-gradient(circle at 80% 90%, rgba(8, 145, 178, 0.2) 0%, transparent 60%)',
                        'radial-gradient(circle at 95% 70%, rgba(6, 182, 212, 0.25) 0%, transparent 60%)',
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.25) 0%, transparent 60%)',
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="fixed inset-0 opacity-80"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
                        Valentine's Week 💕
                    </h1>
                    <p className="text-xl md:text-2xl text-pink-200 font-medium italic">
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
                                    <div
                                        onClick={(e) => {
                                            if (!unlocked) return;
                                            if (day.name === "Rose Day" || day.name === "Propose Day" || day.name === "Chocolate Day" || day.name === "Teddy Day" || day.name === "Promise Day" || day.name === "Hug Day") {
                                                e.preventDefault();
                                                setChallengeDay(day.name);
                                                setShowQuestion(true);
                                                return;
                                            }
                                        }}
                                        className="block"
                                    >
                                        <Link href={(unlocked && day.name !== "Rose Day" && day.name !== "Propose Day" && day.name !== "Chocolate Day" && day.name !== "Teddy Day" && day.name !== "Promise Day" && day.name !== "Hug Day") ? `/letter/${day.date}` : "#"}>
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

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-20 space-y-6"
                >
                    <Link
                        href="/yes"
                        className="inline-block px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white text-xl font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        ← Back to Celebration
                    </Link>
                    <div className="flex flex-col items-center">
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 bg-transparent border-2 border-white/20 text-white/80 text-lg font-semibold rounded-2xl hover:bg-white/5 transition-all hover:scale-105"
                        >
                            🏠 Return to Main Page
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Hearts Background */}
            {mounted && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {[...Array(50)].map((_, i) => {
                        const opacity = Math.random() * 0.4 + 0.1; // Varying transparency
                        const size = Math.random() * 20 + 20; // Varying size
                        return (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight + 100,
                                    opacity: 0,
                                    scale: Math.random() * 0.5 + 0.5
                                }}
                                animate={{
                                    y: -100,
                                    opacity: [0, opacity, opacity, 0],
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 15, // Slower movement
                                    delay: Math.random() * 10,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 5,
                                }}
                                className="absolute"
                                style={{ fontSize: `${size}px` }}
                            >
                                {['💕', '💖', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)]}
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Question Modal */}
            <AnimatePresence>
                {showQuestion && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4"
                        onClick={() => setShowQuestion(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowQuestion(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                ✕
                            </button>

                            <div className="text-center space-y-6">
                                <div className="text-6xl">
                                    {challengeDay === "Rose Day" ? "🌹" : challengeDay === "Propose Day" ? "💍" : challengeDay === "Chocolate Day" ? "🍫" : challengeDay === "Teddy Day" ? "🧸" : challengeDay === "Promise Day" ? "🤝" : "🤗"}
                                </div>
                                <h2 className="text-3xl font-bold text-rose-600">{challengeDay} Challenge</h2>
                                <p className="text-gray-600 text-lg">To unlock this letter, answer this question:</p>

                                <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-100">
                                    <p className="text-xl font-medium text-rose-800 italic">
                                        {challengeDay === "Rose Day"
                                            ? "\"When is our first date?\""
                                            : challengeDay === "Propose Day"
                                                ? "Ammu's favourite fruit?"
                                                : challengeDay === "Chocolate Day"
                                                    ? "What is Allen's favourite song?"
                                                    : challengeDay === "Teddy Day"
                                                        ? "The biggest dummy you have ever met?"
                                                        : challengeDay === "Promise Day"
                                                            ? "What is Allen's favourite Meals?"
                                                            : "Name the person that melts Allen away instantly?"}
                                    </p>
                                    {challengeDay === "Rose Day" && (
                                        <p className="text-sm text-rose-400 mt-2">Format: DD/MM/YYYY</p>
                                    )}
                                </div>

                                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Enter name here..."
                                        className={`w-full px-6 py-4 rounded-xl border-2 focus:outline-none transition-all text-center text-xl ${error
                                            ? 'border-red-400 bg-red-50 animate-shake'
                                            : 'border-rose-100 focus:border-rose-400 bg-white'
                                            }`}
                                    />
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 font-medium"
                                        >
                                            Incorrect answer, try again! 💕
                                        </motion.p>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:scale-[1.02]"
                                    >
                                        Unlock Letter ✨
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
