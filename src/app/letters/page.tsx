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
        } else if (challengeDay === "Kiss Day" && normalizedAnswer === "i'm yours") {
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
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.2) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 20% 10%, rgba(162, 28, 175, 0.2) 0%, rgba(219, 39, 119, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 5% 30%, rgba(219, 39, 119, 0.2) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.2) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="fixed inset-0 opacity-100"
            />

            {/* Cyan Accent */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                        'radial-gradient(circle at 80% 90%, rgba(8, 145, 178, 0.1) 0%, transparent 60%)',
                        'radial-gradient(circle at 95% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="fixed inset-0 opacity-80"
            />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-8xl font-handwritten font-bold text-white drop-shadow-2xl mb-6">
                        Valentine's Week 💕
                    </h1>
                    <div className="w-48 h-1 bg-pink-500/30 mx-auto rounded-full mb-6" />
                    <p className="text-xl md:text-3xl text-pink-100/80 font-handwritten italic">
                        A letter for each special day...
                    </p>
                </motion.div>

                {/* Envelopes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#f4ecd8] border border-[#8d6e63]/20 px-4 py-2 rounded-sm shadow-md z-10">
                                        <p className={`text-xs font-mono font-bold ${unlocked ? 'text-green-700' : 'text-rose-700'}`}>
                                            {timeRemaining}
                                        </p>
                                    </div>

                                    {/* Envelope */}
                                    <div
                                        onClick={(e) => {
                                            if (!unlocked) return;
                                            if (day.name === "Rose Day" || day.name === "Propose Day" || day.name === "Chocolate Day" || day.name === "Teddy Day" || day.name === "Promise Day" || day.name === "Hug Day" || day.name === "Kiss Day") {
                                                e.preventDefault();
                                                setChallengeDay(day.name);
                                                setShowQuestion(true);
                                                return;
                                            }
                                        }}
                                        className="block"
                                    >
                                        <Link href={(unlocked && day.name !== "Rose Day" && day.name !== "Propose Day" && day.name !== "Chocolate Day" && day.name !== "Teddy Day" && day.name !== "Promise Day" && day.name !== "Hug Day" && day.name !== "Kiss Day") ? `/letter/${day.date}` : "#"}>
                                            <motion.div
                                                whileHover={unlocked ? { scale: 1.05, rotate: 1 } : {}}
                                                className={`relative old-paper-texture p-8 rounded-sm shadow-xl min-h-[300px] flex flex-col items-center justify-center border-l-[10px] border-l-[#e6d0a3] ${!unlocked && 'opacity-60 grayscale scale-95'
                                                    }`}
                                            >
                                                {/* Lock Icon */}
                                                {!unlocked && (
                                                    <div className="absolute top-4 right-4 text-3xl opacity-40">
                                                        🔒
                                                    </div>
                                                )}

                                                {/* Envelope Icon */}
                                                <div className="text-7xl mb-6 filter drop-shadow-sm grayscale-[0.2]">
                                                    {unlocked ? '💌' : '✉️'}
                                                </div>

                                                {/* Day Info */}
                                                <h3 className="text-3xl font-handwritten font-bold text-[#5d4037] text-center mb-2">
                                                    {day.name}
                                                </h3>
                                                <p className="text-2xl opacity-80">
                                                    {day.emoji}
                                                </p>

                                                {unlocked && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="mt-6 text-[#8d6e63] font-handwritten font-bold text-lg"
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
                            className="mt-16 flex justify-center"
                        >
                            <div className={`relative group ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'} max-w-2xl w-full px-4`}>
                                {/* Timer */}
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#f4ecd8] border border-[#d4af37]/30 px-6 py-3 rounded-sm shadow-xl z-10">
                                    <p className={`text-sm font-mono font-bold ${unlocked ? 'text-green-700' : 'text-rose-700'}`}>
                                        {timeRemaining}
                                    </p>
                                </div>

                                {/* Envelope */}
                                <Link href={unlocked ? `/letter/${day.date}` : "#"} className="block">
                                    <motion.div
                                        whileHover={unlocked ? { scale: 1.05, rotate: 0.5 } : {}}
                                        className={`relative old-paper-texture p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[450px] flex flex-col items-center justify-center border-l-[20px] border-l-[#e6d0a3] ${!unlocked && 'opacity-60 grayscale scale-95'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none" />

                                        {/* Lock Icon */}
                                        {!unlocked && (
                                            <div className="absolute top-6 right-6 text-5xl opacity-40">
                                                🔒
                                            </div>
                                        )}

                                        {/* Envelope Icon */}
                                        <div className="text-[10rem] mb-8 filter drop-shadow-md">
                                            {unlocked ? '💝' : '✉️'}
                                        </div>

                                        {/* Day Info */}
                                        <h3 className="text-6xl md:text-8xl font-handwritten font-bold text-[#3e2723] text-center mb-4">
                                            {day.name}
                                        </h3>
                                        <p className="text-5xl">
                                            {day.emoji}
                                        </p>

                                        {unlocked && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-10 text-[#5d4037] font-handwritten font-bold text-2xl"
                                            >
                                                Click to open your special letter
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
                    className="text-center mt-24 space-y-8"
                >
                    <Link
                        href="/yes"
                        className="inline-block px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white text-2xl font-handwritten font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-110 shadow-xl"
                    >
                        ← Back to Celebration
                    </Link>
                    <div className="flex flex-col items-center">
                        <Link
                            href="/"
                            className="inline-block text-white/50 text-xl font-handwritten font-semibold hover:text-white transition-all underline underline-offset-8"
                        >
                            🏠 Return to Main Page
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Hearts Background */}
            {mounted && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {[...Array(40)].map((_, i) => {
                        const opacity = Math.random() * 0.3 + 0.1;
                        const size = Math.random() * 20 + 20;
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
                                    duration: Math.random() * 12 + 18,
                                    delay: Math.random() * 10,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 5,
                                }}
                                className="absolute filter sepia-[0.4] grayscale-[0.2]"
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                        onClick={() => setShowQuestion(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="old-paper-texture p-8 md:p-14 rounded-sm shadow-2xl max-w-lg w-full relative border border-[#d7ccc8]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowQuestion(false)}
                                className="absolute top-6 right-6 text-[#5d4037]/40 hover:text-[#5d4037] transition-colors text-2xl"
                            >
                                ✕
                            </button>

                            <div className="text-center space-y-8">
                                <div className="text-7xl filter drop-shadow-sm">
                                    {challengeDay === "Rose Day" ? "🌹" : challengeDay === "Propose Day" ? "💍" : challengeDay === "Chocolate Day" ? "🍫" : challengeDay === "Teddy Day" ? "🧸" : challengeDay === "Promise Day" ? "🤝" : challengeDay === "Hug Day" ? "🤗" : "💋"}
                                </div>
                                <h2 className="text-5xl font-handwritten font-bold text-[#5d4037]">{challengeDay} Challenge</h2>
                                <p className="text-[#8d6e63] font-handwritten text-2xl">To unlock this letter, answer this question:</p>

                                <div className="bg-[#5d4037]/5 p-8 rounded-sm border border-[#5d4037]/10 relative">
                                    <div className="absolute top-0 left-2 text-4xl text-[#5d4037]/10 font-serif">“</div>
                                    <p className="text-3xl font-handwritten font-bold text-[#3e2723] italic">
                                        {challengeDay === "Rose Day"
                                            ? "When is our first date?"
                                            : challengeDay === "Propose Day"
                                                ? "Ammu's favourite fruit?"
                                                : challengeDay === "Chocolate Day"
                                                    ? "What is Allen's favourite song?"
                                                    : challengeDay === "Teddy Day"
                                                        ? "The biggest dummy you have ever met?"
                                                        : challengeDay === "Promise Day"
                                                            ? "What is Allen's favourite Meals?"
                                                            : challengeDay === "Hug Day"
                                                                ? "Name the person that melts Allen away instantly?"
                                                                : "what is the first song that made us madly fall in love?"}
                                    </p>
                                    <div className="absolute bottom-0 right-2 text-4xl text-[#5d4037]/10 font-serif">”</div>
                                    {challengeDay === "Rose Day" && (
                                        <p className="text-sm font-mono text-[#8d6e63] mt-4 opacity-60">Format: DD/MM/YYYY</p>
                                    )}
                                </div>

                                <form onSubmit={handleAnswerSubmit} className="space-y-6">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Write your answer here..."
                                        className={`w-full px-8 py-5 rounded-sm border-b-2 bg-transparent focus:outline-none transition-all text-center text-3xl font-handwritten text-[#3e2723] placeholder:text-[#8d6e63]/40 ${error
                                            ? 'border-red-500 animate-shake'
                                            : 'border-[#5d4037]/20 focus:border-[#5d4037]'
                                            }`}
                                    />
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-600 font-handwritten font-bold text-xl"
                                        >
                                            Not quite right, try again! 💕
                                        </motion.p>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-[#5d4037] text-[#f4ecd8] text-2xl font-handwritten font-bold rounded-sm shadow-lg hover:bg-[#4e342e] transition-all hover:scale-[1.02] mt-4"
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
