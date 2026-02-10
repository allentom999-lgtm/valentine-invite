"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        message: "My Love,\n\nFrom the day you waved into my life, everything started feeling brighter, calmer, and more meaningful. You became the person I want to share my victories with, the one I want beside me when things get tough, and the smile I look forward to at the end of every day.\n\nOn this Propose Day, I just want to tell you what my heart has known for a long time—life feels right with you in it. You inspire me to become better, dream bigger, and work harder for the future we both deserve.\n\nI don’t promise a perfect life, but I promise to stand with you through every imperfect moment. To support you, laugh with you, grow with you, and love you a little more every day. I am glad that I have followed my heart than listening to my head. hehee....\n\nSo today, with all my heart, I want to ask you—will you continue this beautiful journey with me and let me be the one who loves and stands by you always?\n\nForever yours,\nAllen"
    },
    "2026-02-09": {
        title: "Chocolate Day",
        emoji: "🍫",
        color: "from-amber-600 to-yellow-500",
        message: "Happy Chocolate Day to the one who melts my heart effortlessly.\n\nChocolate is sweet, but the comfort I feel with you is sweeter. It’s in your smile, your voice, your presence — everything about you makes life softer and happier.\n\nToday, as we share chocolates, I just want you to know that you are the sweetest blessing in my life, and I cherish every moment we create together.\n\nAlways loving you.\nAllen Thomas"
    },
    "2026-02-10": {
        title: "Teddy Day",
        emoji: "🧸",
        color: "from-orange-400 to-red-400",
        message: "My Princess,\n\nI’ve been thinking about today, and it honestly hurts knowing I made you feel bad. I’m really sorry for the way I spoke to you. You didn’t deserve that at all. I let my emotions get the better of me instead of choosing my words with care, and I regret it.\n\nYou’re so important to me, and you deserve nothing but kindness, respect, and love. The last thing I ever want is to be the reason you feel hurt or upset. I want to be the person who makes your days lighter, not heavier.\n\nIf anything I said made you feel unappreciated or doubted how much you mean to me, I’m truly sorry. That was never what I wanted. Sometimes I don’t express myself well, but my heart has always been on your side. I’ll try to be better — calmer, more patient, and more thoughtful with you.\n\nI really hope you can forgive me. I don’t like it when there's distance between us. I just want things to feel normal again, with us laughing and talking like we always do.\n\nBecause you’re my princess, and you deserve the best version of me — always."
    },
    "2026-02-11": {
        title: "Promise Day",
        emoji: "🤝",
        color: "from-blue-400 to-purple-400",
        message: "My Love,\n\nOn this Promise Day, I want to promise you the little things that truly matter to us.\n\nI promise to be patient when days get hard, to hold your hand when you feel unsure, and to always remind you how amazing you are. I promise to laugh with you in happy moments and stand strong beside you when life tests us.\n\nI promise to never stop choosing you, respecting you, and loving you in ways that make you feel safe and valued. No matter where life takes us, my heart will always find its way back to you.\n\nAnd above all, I promise that my intentions with you are pure to grow together, support each other, and build a love that feels like home.\n\nAlways yours,\nAllen"
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

const StitchTeddy = () => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center mt-8 mb-4"
        >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Stitch Body (Simplified SVG) */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Ears */}
                    <motion.path
                        d="M40,60 Q10,20 60,40"
                        fill="#4A90E2"
                        animate={{ rotate: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.path
                        d="M160,60 Q190,20 140,40"
                        fill="#4A90E2"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Head */}
                    <circle cx="100" cy="80" r="50" fill="#4A90E2" />

                    {/* Eyes */}
                    <ellipse cx="80" cy="75" rx="12" ry="15" fill="white" />
                    <ellipse cx="120" cy="75" rx="12" ry="15" fill="white" />
                    <circle cx="82" cy="75" r="5" fill="black" />
                    <circle cx="118" cy="75" r="5" fill="black" />

                    {/* Nose */}
                    <motion.path
                        d="M90,95 Q100,105 110,95"
                        fill="none"
                        stroke="#2171C1"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Mouth/Smile */}
                    <motion.path
                        d="M85,110 Q100,125 115,110"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        animate={{ d: ["M85,110 Q100,125 115,110", "M80,110 Q100,135 120,110", "M85,110 Q100,125 115,110"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Left Arm (Waving) */}
                    <motion.path
                        d="M60,110 Q30,130 50,150"
                        fill="none"
                        stroke="#4A90E2"
                        strokeWidth="15"
                        strokeLinecap="round"
                        animate={{ rotate: [0, -30, 0], originX: "60px", originY: "110px" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Right Arm (Waving) */}
                    <motion.path
                        d="M140,110 Q170,130 150,150"
                        fill="none"
                        stroke="#4A90E2"
                        strokeWidth="15"
                        strokeLinecap="round"
                        animate={{ rotate: [0, 30, 0], originX: "140px", originY: "110px" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Body */}
                    <path d="M65,120 Q100,180 135,120" fill="#4A90E2" />
                    <circle cx="100" cy="145" r="25" fill="#A5D8FF" opacity="0.5" />
                </svg>
            </div>
            <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-blue-600 font-bold text-xl mt-4"
            >
                Hi Princess! 🧸💙
            </motion.p>
        </motion.div>
    );
};

export default function LetterPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = use(params);
    const [showResponse, setShowResponse] = useState(false);
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
    const isTeddyDay = date === "2026-02-10";

    return (
        <div className="min-h-screen bg-[#0a060e] flex flex-col items-center justify-center px-4 py-16 overflow-hidden font-poppins text-white">
            {/* Animated breathing background - Magenta/Rose focus */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.25) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 20% 10%, rgba(162, 28, 175, 0.25) 0%, rgba(219, 39, 119, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 5% 30%, rgba(219, 39, 119, 0.25) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                        'radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.25) 0%, rgba(162, 28, 175, 0.1) 35%, transparent 70%)',
                    ],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 opacity-100"
            />

            {/* Cyan Accent */}
            <motion.div
                animate={{
                    background: [
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
                        'radial-gradient(circle at 80% 90%, rgba(8, 145, 178, 0.15) 0%, transparent 60%)',
                        'radial-gradient(circle at 95% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
                        'radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute inset-0 opacity-80"
            />
            <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 relative z-10 ${isValentineDay ? 'max-w-4xl' : 'max-w-3xl'
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
                    <h1 className={`${isValentineDay ? 'text-6xl' : 'text-4xl'} font-bold text-white drop-shadow-lg mb-4`}>
                        {letter.title}
                    </h1>
                </motion.div>

                {/* Teddy Day Special Animation */}
                {isTeddyDay && <StitchTeddy />}

                {/* Letter Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6"
                >
                    <div className={`${isValentineDay ? 'text-2xl' : 'text-lg'} text-pink-50 leading-relaxed text-center font-medium italic whitespace-pre-line`}>
                        {isTeddyDay ? (
                            <div className="text-left space-y-4 not-italic font-sans">
                                {letter.message.split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        ) : (
                            `"${letter.message}"`
                        )}
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

                    {!isValentineDay && date === "2026-02-08" && (
                        <div className="flex justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowResponse(true)}
                                className="px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                            >
                                Yes I want to be yours! 💍
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                {/* Popup Response */}
                <AnimatePresence>
                    {showResponse && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4"
                            onClick={() => setShowResponse(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                                className="bg-white p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-6xl mb-6">👩‍❤️‍👨</div>
                                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                                    You are already mine hehe....
                                </h2>
                                <button
                                    onClick={() => setShowResponse(false)}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
                                >
                                    Forever! 💕
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Signature */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-12 text-right"
                >
                    <p className={`${isValentineDay ? 'text-3xl' : 'text-2xl'} font-medium text-pink-200`}>
                        {isTeddyDay ? "Always yours," : "With all my love,"}
                    </p>
                    <p className={`${isValentineDay ? 'text-4xl' : 'text-3xl'} font-bold text-white mt-2 drop-shadow-md`}>
                        {isTeddyDay ? "Allen ❤️" : "Your Valentine 💕"}
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
                        className="inline-block px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white text-lg font-bold rounded-2xl hover:bg-white/20 transition-all shadow-xl hover:scale-105"
                    >
                        ← Back to All Letters
                    </Link>
                    <div className="mt-6 flex flex-col items-center">
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 bg-transparent border-2 border-white/10 text-white/60 text-base font-semibold rounded-2xl hover:bg-white/5 transition-all"
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
