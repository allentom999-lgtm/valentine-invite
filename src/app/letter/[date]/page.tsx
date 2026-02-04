"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const letterContent: Record<string, { title: string; emoji: string; message: string; color: string }> = {
    "2026-02-07": {
        title: "Rose Day",
        emoji: "🌹",
        color: "from-red-400 to-pink-500",
        message: "Like a rose, you bring beauty and joy to my life every single day. Your smile is the most precious thing to me. 🌹💕"
    },
    "2026-02-08": {
        title: "Propose Day",
        emoji: "💍",
        color: "from-purple-400 to-pink-400",
        message: "Every moment with you feels like a dream. You make my heart skip a beat, and I'm so grateful you said yes! 💍✨"
    },
    "2026-02-09": {
        title: "Chocolate Day",
        emoji: "🍫",
        color: "from-amber-600 to-yellow-500",
        message: "You're sweeter than any chocolate in the world. Your sweetness makes every day special! 🍫💖"
    },
    "2026-02-10": {
        title: "Teddy Day",
        emoji: "🧸",
        color: "from-orange-400 to-red-400",
        message: "I want to be your comfort, your warmth, and your cuddle buddy forever. You deserve all the hugs! 🧸🤗"
    },
    "2026-02-11": {
        title: "Promise Day",
        emoji: "🤝",
        color: "from-blue-400 to-purple-400",
        message: "I promise to always make you smile, to support you, and to love you with all my heart. Forever and always! 🤝💕"
    },
    "2026-02-12": {
        title: "Hug Day",
        emoji: "🤗",
        color: "from-green-400 to-teal-400",
        message: "Your hugs are my favorite place in the world. They make everything better. Sending you the biggest virtual hug! 🤗💖"
    },
    "2026-02-13": {
        title: "Kiss Day",
        emoji: "💋",
        color: "from-pink-500 to-rose-500",
        message: "Every kiss with you feels like magic. You make my heart race and my soul sing! 💋✨"
    },
    "2026-02-14": {
        title: "Valentine's Day",
        emoji: "💖",
        color: "from-rose-500 to-pink-600",
        message: "Happy Valentine's Day, my love! You are my everything - my best friend, my partner, my soulmate. Thank you for being you and for choosing me. I love you more than words can express! 💖🌹✨"
    },
};

export default function LetterPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = use(params);
    const letter = letterContent[date];

    if (!letter) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-rose-600 mb-4">Letter Not Found</h1>
                    <Link href="/letters" className="text-pink-600 underline">
                        Back to Letters
                    </Link>
                </div>
            </div>
        );
    }

    const isValentineDay = date === "2026-02-14";

    return (
        <div className={`min-h-screen bg-gradient-to-br ${letter.color} flex items-center justify-center px-4 py-16`}>
            <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 ${isValentineDay ? 'max-w-4xl' : 'max-w-2xl'
                    } w-full`}
            >
                {/* Envelope Opening Animation */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <div className={`${isValentineDay ? 'text-9xl' : 'text-7xl'} mb-4`}>
                        {letter.emoji}
                    </div>
                    <h1 className={`${isValentineDay ? 'text-6xl' : 'text-4xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r ${letter.color} mb-4`}>
                        {letter.title}
                    </h1>
                </motion.div>

                {/* Letter Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6"
                >
                    <div className={`${isValentineDay ? 'text-2xl' : 'text-xl'} text-gray-700 leading-relaxed text-center font-serif italic`}>
                        "{letter.message}"
                    </div>

                    {isValentineDay && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className="text-center text-6xl mt-8"
                        >
                            💕💖💗💝❤️
                        </motion.div>
                    )}
                </motion.div>

                {/* Signature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12 text-right"
                >
                    <p className={`${isValentineDay ? 'text-3xl' : 'text-2xl'} font-script text-rose-600`}>
                        With all my love,
                    </p>
                    <p className={`${isValentineDay ? 'text-4xl' : 'text-3xl'} font-script text-rose-700 mt-2`}>
                        Your Valentine 💕
                    </p>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/letters"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-xl hover:scale-105"
                    >
                        ← Back to All Letters
                    </Link>
                </motion.div>
            </motion.div>

            {/* Floating Hearts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 0,
                            opacity: 0,
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 0.6, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 4 + 6,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 3,
                        }}
                        className="absolute text-4xl md:text-6xl"
                    >
                        {letter.emoji}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
