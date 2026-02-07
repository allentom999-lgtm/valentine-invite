"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const letterContent: Record<string, { title: string; emoji: string; message: string; color: string }> = {
    "2026-02-07": {
        title: "Rose Day",
        emoji: "🌹",
        color: "from-red-400 to-pink-500",
        message: "My Love,\n\nOn this Rose Day, I wish I could hand you a rose in person and watch that beautiful smile bloom on your face. But until I can, let this letter be my rose carrying all my love to you.\n\nLike a rose, you’ve brought color, warmth, and fragrance into my life. Even on my toughest days, just thinking of you calms me down. You are my comfort, my motivation, and the most beautiful part of my journey.\n\nEvery dream I chase feels more meaningful because I see you walking beside me in the future. I promise to keep growing, improving, and becoming someone who deserves your love every single day.\n\nSoon that day will come where my baby wakes up and surprise you with flowers on rose.. that day will come soon my cheesecake!\n\nIf I could, I would fill your world with roses in every shade you love soft pink, gentle lavender, and all the colors that match your beautiful heart. But more than flowers, I want to give you laughter, support, and a lifetime of little happy moments together.\n\nHappy Rose Day, my love. Thank you for being my reason to smile.\n\nForever yours,\nAllen"
    },
    "2026-02-08": {
        title: "Propose Day",
        emoji: "💍",
        color: "from-purple-400 to-pink-400",
        message: "My Love,\n\nFrom the day you walked into my life, everything started feeling brighter, calmer, and more meaningful. You became the person I want to share my victories with, the one I want beside me when things get tough, and the smile I look forward to at the end of every day.\n\nOn this Propose Day, I just want to tell you what my heart has known for a long time—life feels right with you in it. You inspire me to become better, dream bigger, and work harder for the future we both deserve.\n\nI don’t promise a perfect life, but I promise to stand with you through every imperfect moment. To support you, laugh with you, grow with you, and love you a little more every day.\n\nSo today, with all my heart, I want to ask you—will you continue this beautiful journey with me and let me be the one who loves and stands by you always?"
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
                    <div className="mt-4">
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 border-2 border-rose-500 text-rose-600 text-lg font-semibold rounded-full hover:bg-rose-50 transition-all shadow-md hover:scale-105"
                        >
                            🏠 Return to Main Page
                        </Link>
                    </div>
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
